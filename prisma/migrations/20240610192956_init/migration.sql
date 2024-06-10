-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteJob" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "employer" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FavoriteJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FavoriteJob" ADD CONSTRAINT "FavoriteJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
