import { supabase } from "db/supabase/supabase";
import { useEffect, useState } from "preact/hooks";
import Row from "components/commons/Row";
import Item from "components/commons/Item";
import ButtonItem from "components/commons/ButtonItem";
import ButtonPrimary from "components/commons/ButtonPrimary";
import Table from "components/commons/Table";

type ViewProps = {
  setEditInsuranceAgent: (agent: InsuranceAgent) => void;
};

export type InsuranceAgent = {
  id: number
  passportData: string
  fullName: string
}

export const View = (props: ViewProps) => {
  const [agents, setAgents] = useState<InsuranceAgent[] | undefined>(undefined);

  useEffect(() => {
    updateState();
  }, []);

  const updateState = async () => {
    const { data } = await supabase.from("InsuranceAgent").select("*");
    if (data) {
      setAgents(data);
    }
  };

  const handleRemoveClick = async (agent: InsuranceAgent) => {
    await supabase.from("InsuranceAgent").delete().eq("id", agent.id!);
    await updateState();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Table>
          <InsuranceAgentHeader />
          <>
            {agents &&
              agents.map((agent) => (
                <InsuranceAgentCard
                  agent={agent}
                  onEditClick={() => props.setEditInsuranceAgent(agent)}
                  onRemoveClick={() => handleRemoveClick(agent)}
                />
              ))}
          </>
        </Table>
      </div>
      <div className="flex justify-start">
        <ButtonPrimary value="Reload" onClick={updateState} />
      </div>
    </div>
  );
};

type InsuranceAgentCardProps = {
  agent: InsuranceAgent;
  onEditClick: () => void;
  onRemoveClick: () => void;
};

const InsuranceAgentCard = (props: InsuranceAgentCardProps) => (
  <Row>
    <Item content={props.agent.id} center />
    <Item content={props.agent.fullName} />
    <Item content={props.agent.passportData} monospace />
    <ButtonItem content="Edit" onClick={props.onEditClick} />
    <ButtonItem content="Remove" onClick={props.onRemoveClick} />
  </Row>
);

export const InsuranceAgentHeader = () => (
  <Row>
    <Item content="ID" center />
    <Item content="Full Name" center />
    <Item content="Passport data" center />
  </Row>
);
