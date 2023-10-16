/*
  Warnings:

  - The primary key for the `EmployeesInContract` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EmployeesInContract` table. All the data in the column will be lost.
  - Changed the type of `riskCategory` on the `InsuredEmploye` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RiskCategory" AS ENUM ('LowRisk', 'MediumRisk', 'ModerateRisk', 'HighRisk', 'VeryHighRisk');

-- DropForeignKey
ALTER TABLE "EmployeesInContract" DROP CONSTRAINT "EmployeesInContract_contractId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeesInContract" DROP CONSTRAINT "EmployeesInContract_employeeId_fkey";

-- AlterTable
ALTER TABLE "EmployeesInContract" DROP CONSTRAINT "EmployeesInContract_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EmployeesInContract_pkey" PRIMARY KEY ("contractId", "employeeId");

-- AlterTable
ALTER TABLE "InsuredEmploye" DROP COLUMN "riskCategory",
ADD COLUMN     "riskCategory" "RiskCategory" NOT NULL;

-- AddForeignKey
ALTER TABLE "EmployeesInContract" ADD CONSTRAINT "EmployeesInContract_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "InsuranceContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeesInContract" ADD CONSTRAINT "EmployeesInContract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "InsuredEmploye"("id") ON DELETE CASCADE ON UPDATE CASCADE;
