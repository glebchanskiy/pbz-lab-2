-- CreateTable
CREATE TABLE "EmployeesPaymentsInContract" (
    "contractId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "EmployeesPaymentsInContract_pkey" PRIMARY KEY ("contractId","employeeId")
);

-- CreateTable
CREATE TABLE "InsuranceContractPaymants" (
    "riskCategory" "RiskCategory" NOT NULL,
    "cost" INTEGER NOT NULL,
    "insuranceContractId" INTEGER NOT NULL,

    CONSTRAINT "InsuranceContractPaymants_pkey" PRIMARY KEY ("riskCategory","insuranceContractId")
);

-- AddForeignKey
ALTER TABLE "EmployeesPaymentsInContract" ADD CONSTRAINT "EmployeesPaymentsInContract_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "InsuranceContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeesPaymentsInContract" ADD CONSTRAINT "EmployeesPaymentsInContract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "InsuredEmploye"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceContractPaymants" ADD CONSTRAINT "InsuranceContractPaymants_insuranceContractId_fkey" FOREIGN KEY ("insuranceContractId") REFERENCES "InsuranceContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
