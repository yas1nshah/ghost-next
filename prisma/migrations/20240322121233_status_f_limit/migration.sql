-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TEAM', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,
    "address" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "phone" TEXT NOT NULL,
    "dealer" BOOLEAN NOT NULL DEFAULT false,
    "ad_limit" INTEGER NOT NULL DEFAULT 1,
    "featured_limit" INTEGER NOT NULL DEFAULT 0,
    "date_joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" UUID NOT NULL,
    "title" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "gpcar" BOOLEAN NOT NULL DEFAULT false,
    "gallery" TEXT[],
    "galleryIndex" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "transmission" BOOLEAN NOT NULL,
    "engine" TEXT NOT NULL,
    "engineCapacity" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sellerID" UUID NOT NULL,
    "sellerComments" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemandList" (
    "id" UUID NOT NULL,
    "demand" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DemandList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "Car_make_idx" ON "Car"("make");

-- CreateIndex
CREATE INDEX "Car_model_idx" ON "Car"("model");

-- CreateIndex
CREATE INDEX "Car_year_idx" ON "Car"("year");

-- CreateIndex
CREATE INDEX "Car_title_idx" ON "Car"("title");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
