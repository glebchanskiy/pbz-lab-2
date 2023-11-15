import { supabase } from "db/supabase/supabase";
import { useState } from "preact/hooks";
import Table from "components/commons/Table";
import type { InsuranceContract } from "./View";
import Row from "components/commons/Row";
import Item from "components/commons/Item";
import moment from 'moment';

type Task2CardProps = {
  contracts: InsuranceContract[];
};

type TaskRecord = {
  agentName: string
  passportData: string
  contractCreationDate: string
  organizationName: string
}

export const Task2Card = (props: Task2CardProps) => {
  const [foundedAgents, setFoundedAgents] = useState<
  TaskRecord[] | undefined
  >(
    undefined,
  );

  const [date, setDate] = useState<Date | undefined>();
  const [organizationName, setOrganizationName] = useState<string>();

  const changeDate = (e: Event) => {
    const date = (e.target as HTMLInputElement).value;
    setDate(new Date(date));
  };

  const findAgentsByDateAndOrg = async () => {
    if (organizationName && date) {
      const d =  moment(date).format('YYYY-MM-DD HH:mm');
      console.log("moment: ", d)
  

      // const { data } = await supabase.from("InsuranceAgent").select(
      //   "*, InsuranceContract!inner(*, Organization!inner(fullName))")
      //   .filter('InsuranceContract.Organization.fullName', 'eq', organizationName)
      //   .filter('InsuranceContract.expirationDate', 'gte', date.toISOString())
      //   .filter('InsuranceContract.creationDate', 'lte', date.toISOString());
      const { data } = await supabase.rpc("getInsuranceAgentsByDate", {organizationnamearg: organizationName, selecteddatearg: date.toISOString()})

      console.log('result: ', data)
      setFoundedAgents(data as TaskRecord[])

    }
  };


  return (
    <div class={"flex flex-col border p-2 mt-10 gap-2"}>
      <p>
      Просмотр списка страховых агентов, работающих с выбранным предприятием на выбранную дату
      </p>
      <div className="flex justify-between">
        <div>
          <input
            type="date"
            name="datetime"
            id="datetime"
            onChange={(e) => changeDate(e)}
          />
          <select
            value={undefined}
            onChange={(e) =>
              setOrganizationName((e.target as HTMLInputElement).value)}
          >
            <option selected disabled>Select an option</option>
            {[
              ...new Set(
                props.contracts?.map((item) => item.Organization?.fullName),
              ),
            ]
              .map((name) => <option value={name}>{name}</option>)}
          </select>
        </div>
        <button
          className="bg-[#D0E7D2] p-1 rounded"
          onClick={findAgentsByDateAndOrg}
        >
          Search
        </button>
      </div>
      {foundedAgents &&
        (
          <Table>
            <>
              <InsuranceAgentCardHeader />
              {foundedAgents.map((agent) => (
                <AgentCard
                  agent={agent}
                />
              ))}
            </>
          </Table>
        )}
    </div>
  );
};

type AgentCardProps = {
  agent: TaskRecord;
};

const AgentCard = (props: AgentCardProps) => (
  <Row>
    <Item content={props.agent.agentName} center />
    <Item content={new Date(props.agent.contractCreationDate).toDateString()} />
    <Item content={props.agent.passportData} monospace />
    <Item content={props.agent.organizationName} monospace />
  </Row>
);

const InsuranceAgentCardHeader = () => (
  <Row>
    <Item content="Full Name" center />
    <Item content="Contract startAt" center />
    <Item content="Passport data" center />
    <Item content="Organization" center />
  </Row>
);

