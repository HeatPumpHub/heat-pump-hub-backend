-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'INSTALLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'BANNED');

-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('OUTDOOR_UNIT', 'INDOOR_UNIT', 'HYDROBOX', 'CONTROLLER', 'HOT_WATER_CYLINDER', 'BUFFER_VESSEL', 'CIRCULATION_PUMP', 'ACCESSORY');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL DEFAULT '',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatar" TEXT,
    "role" "Role" NOT NULL,
    "roleSpecificCharacteristics" JSONB NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "warranty" INTEGER NOT NULL,
    "manufacturerNumber" TEXT NOT NULL,
    "category" "ItemCategory" NOT NULL,
    "categorySpecificCharacteristics" JSONB NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "building_assessments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "manualInputData" JSONB NOT NULL,
    "manualCalculatedPower" DOUBLE PRECISION NOT NULL,
    "manualCalculatedDHWVolume" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "building_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combinations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "combinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combination_items" (
    "id" TEXT NOT NULL,
    "combinationId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "combination_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "buildingAssessmentId" TEXT NOT NULL,
    "combinationId" TEXT NOT NULL,
    "offerSnapshot" JSONB NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "discount" SMALLINT NOT NULL DEFAULT 0,
    "status" "OfferStatus" NOT NULL DEFAULT 'ACTIVE',
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "items_name_key" ON "items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "items_manufacturerNumber_key" ON "items"("manufacturerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "combination_items_combinationId_itemId_key" ON "combination_items"("combinationId", "itemId");

-- AddForeignKey
ALTER TABLE "building_assessments" ADD CONSTRAINT "building_assessments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combination_items" ADD CONSTRAINT "combination_items_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "combinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combination_items" ADD CONSTRAINT "combination_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_buildingAssessmentId_fkey" FOREIGN KEY ("buildingAssessmentId") REFERENCES "building_assessments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "combinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
