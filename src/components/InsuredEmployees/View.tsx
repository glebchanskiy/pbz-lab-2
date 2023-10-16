import type { RiskCategory } from "@prisma/client";
import ButtonItem from "components/commons/ButtonItem";
import ButtonPrimary from "components/commons/ButtonPrimary";
import Item from "components/commons/Item";
import Row from "components/commons/Row";
import Table from "components/commons/Table";
import { supabase } from "db/supabase/supabase";
import { useEffect, useState } from "preact/hooks";

export interface InsuredEmploye {
  id: number;
  fullName: string;
  age: number;
  riskCategory: RiskCategory;
  organizationId: number;
  Organization: {
    id: number;
    fullName: string;
  }
}

type ViewProps = {
  setEditInsuredEmployee: (o: InsuredEmploye) => void;
};

export const View = (props: ViewProps) => {
  const [orgs, setOrgs] = useState<InsuredEmploye[] | undefined>(undefined);

  useEffect(() => {
    updateState();
  }, []);

  const updateState = async () => {
    const { data } = await supabase.from("InsuredEmploye").select("*, Organization (id, fullName)");
    if (data) {
      setOrgs(data);
    }
  };

  return (
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <Table>
          <ContractsHeader/>
          <>
            {orgs &&
              orgs.map((o) => (
                <InsuredEmployeeCard
                  insuredEmployee={o}
                  onEditClick={async () => {
                    props.setEditInsuredEmployee(o);
                  }}
                  onRemoveClick={async () => {
                    await supabase.from("InsuredEmploye").delete().eq(
                      "id",
                      o.id!,
                    );
                    await updateState();
                  }}
                />
              ))}
          </>
        </Table>
      </div>
      <div class="flex justify-start">
        <ButtonPrimary value="Reload" onClick={updateState} />
      </div>
    </div>
  );
};

type InsuredEmployeeCardProps = {
  insuredEmployee: InsuredEmploye;
  onEditClick: () => void;
  onRemoveClick: () => void;
};

const InsuredEmployeeCard = (props: InsuredEmployeeCardProps) => (
  <Row>
    <Item content={props.insuredEmployee.id} center />
    <Item
      content={props.insuredEmployee.fullName}
      center
    />
    <Item
      content={props.insuredEmployee.riskCategory}
      center
    />
    <Item content={props.insuredEmployee.Organization.fullName} center />

    <ButtonItem content="Edit" onClick={props.onEditClick} />
    <ButtonItem content="Remove" onClick={props.onRemoveClick} />
  </Row>
);

const ContractsHeader = () => (
  <Row>
    <Item content="ID" center />
    <Item content="Full name" center />
    <Item content="Risk category" center />
    <Item content="Organization" center />
  </Row>
);
