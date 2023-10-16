-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bankNumber" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuredEmploye" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "riskCategory" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "InsuredEmploye_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceAgent" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "passportData" TEXT NOT NULL,

    CONSTRAINT "InsuranceAgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceContract" (
    "id" SERIAL NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "cost" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "agentId" INTEGER NOT NULL,

    CONSTRAINT "InsuranceContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeesInContract" (
    "id" SERIAL NOT NULL,
    "contractId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "EmployeesInContract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InsuredEmploye" ADD CONSTRAINT "InsuredEmploye_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceContract" ADD CONSTRAINT "InsuranceContract_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceContract" ADD CONSTRAINT "InsuranceContract_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "InsuranceAgent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeesInContract" ADD CONSTRAINT "EmployeesInContract_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "InsuranceContract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeesInContract" ADD CONSTRAINT "EmployeesInContract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "InsuredEmploye"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
