import { prisma } from "../../db/connect";
import { Request, Response } from "express"; // för typescript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface Query {
  limit?: string;
  sort?: string; // TODO - välj mellan valbara keys
  order?: "asc" | "desc";
}

//Get all users - GET /api/users
export async function getUsers(req: Request<{}, {}, {}, Query>, res: Response) {
  //api/users/?limit=21&sort=username&order=asc
  // limit - pagination - default 10
  // sort - vad som man kan sorteras på - default "id"
  // order - stigande eller fallande - default "asc"
  const limit: number = req.query.limit ? parseInt(req.query.limit) : 10;
  const sortField = req.query.sort || "id";
  const sortOrder = req.query.order || "asc";

  const sort = { [sortField]: sortOrder };

  console.log("Limit", limit, "SortField", sortField, "SortOrder", sortOrder);

  // use prisma to get all users with error handling
  try {
    const users = await prisma.user.findMany({
      take: limit, // Pagination, hur mycket per request
      orderBy: sort, // Sorterar på viss key och och stigande eller fallende ordning
    });

    // if no users are found, return a 404 error
    if (!users.length)
      return res.status(404).json({ message: "No users found" });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

//Get user by id - GET /api/users/:id
export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}

// Create/register user - POST /api/users
export async function registerUser(req: Request, res: Response) {
  try {
    const { password, email } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: email,
      },
    });

    res.status(201).json({ id: user.id, message: "User created!" });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Find user in database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("Missing JWT_SECRET in environment");
    }
    if (!process.env.JWT_EXPIRES_IN) {
      throw new Error("Missing JWT_EXPIRES_IN in environment");
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
};


// Update user - PUT /api/users/:id
export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { password, email } = req.body;
    console.log("id", id, "password", password, "email", email);

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: hashedPassword,
        email: email,
      },
    });

    if (!user) return res.status(404).json({ error: "User not updated!" });

    res.status(200).json({ message: "User updated!" });
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

// Delete user and favorite jobs - DELETE /api/user/:id
export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const jobs = await prisma.favoriteJob.deleteMany({
      where: {
        userId: parseInt(id),
      },
    });

    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) return res.status(404).json({ error: "User not deleted!" });

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}
