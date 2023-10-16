import type { InsuranceAgent, RiskCategory } from "@prisma/client";
import { InsuranceAgentHeader } from "components/InsuredAgent/View";

import type { Organization } from "components/Organizations";
import Item from "components/commons/Item";
import Row from "components/commons/Row";
import Table from "components/commons/Table";
import { supabase } from "db/supabase/supabase";
import { useEffect, useState } from "preact/hooks";
import { Task1Card } from "./Task1Card";
import { Task2Card } from "./Task2Card";
import { Task3Card } from "./Task3Card";

export interface InsuranceContract {
  agentId: number;
  creationDate: string;
  expirationDate: string;
  id: number;
  organizationId: number;
  Organization: Organization | null;
  InsuranceAgent: InsuranceAgent | null;
  InsuranceContractPaymants: {
    cost: number;
    insuranceContractId: number;
    riskCategory: RiskCategory;
  }[]
}

export const View = () => {
  const [contracts, setContracts] = useState<InsuranceContract[] | undefined>(
    undefined,
  );

  const [foundedAgents, setFoundedAgents] = useState<
    InsuranceAgent[] | undefined
  >(
    undefined,
  );

  useEffect(() => {
    updateState();
  }, []);

  const updateState = async () => {
    const { data: contracts } = await supabase.from("InsuranceContract").select(
      `*, 
      InsuranceContractPaymants!inner (*),
      Organization (*), 
      InsuranceAgent!inner (*)
      `
    );

    if (contracts) {
      console.log(contracts);
      setContracts(contracts);
    }
  };

  return (
    <div className="flex flex-col gap-5 mx-auto w-250 mt-5">
      <div className="flex flex-col gap-2">
        <Table>
          <ContractsHeader />
          <>
            {contracts &&
              contracts.map((contract) => (
                <ContractCard
                  contract={contract}
                />
              ))}
          </>
        </Table>
      </div>

      {contracts && <Task1Card contracts={contracts} />}
      {contracts && <Task2Card contracts={contracts} />}
      {contracts && <Task3Card contracts={contracts} />}
    </div>
  );
};


type ContractCardProps = {
  contract: InsuranceContract;
};

export const ContractCard = (props: ContractCardProps) => (
  <Row>
    <Item content={props.contract.id} center />
    <Item
      content={new Date(props.contract.creationDate).toDateString()}
      center
    />
    <Item
      content={new Date(props.contract.expirationDate).toDateString()}
      center
    />
    <Item content={props.contract.InsuranceContractPaymants.map(payment => `${payment.riskCategory}:${payment.cost}`).reduce((s, val) => s + ' ' + val)} />
    <Item content={props.contract.Organization?.fullName!} center />
    <Item content={props.contract.InsuranceAgent?.fullName!} center />
  </Row>
);



const ContractsHeader = () => (
  <Row>
    <Item content="ID" center />
    <Item content="Creation Date" center />
    <Item content="Expiration Date" center />
    <Item content="Cost" center />
    <Item content="Organization" center />
    <Item content="Agent" center />
  </Row>
);

const ViewCompanyOnSelectedDate = () => {
};
