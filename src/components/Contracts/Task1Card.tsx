import { supabase } from "db/supabase/supabase";
import { useState } from "preact/hooks";
import Table from "components/commons/Table";
import Row from "components/commons/Row";
import Item from "components/commons/Item";
import type { InsuranceContract } from "./View";

type Task1CardProps = {
  contracts: InsuranceContract[];
};

type TaskRecord = {
  contractId: number
  address: string
  creationDate: string
  expirationDate: string
  organizationName: string
}

export const Task1Card = (props: Task1CardProps) => {
  const [foundedContracts, setFoundedContracts] = useState<
  TaskRecord[] | undefined
  >(
    undefined
  );

  const [date, setDate] = useState<Date | undefined>();
  const [organizationName, setOrganizationName] = useState<string>();

  const changeDate = (e: Event) => {
    const date = (e.target as HTMLInputElement).value;
    setDate(new Date(date));
  };

  const findContractsByDateAndOrg = async () => {
    if (organizationName && date) {
      const { data } = await supabase.rpc("getActiveContractsByDate", {organizationnamearg: organizationName, selecteddatearg: date.toISOString()})
      if (data)
        setFoundedContracts(data as TaskRecord[])
    }
  };

  return (
    <div class={"flex flex-col border p-2 mt-10 gap-2"}>
      <p>
        Просмотр списка действующих договоров, заключенных выбранным
        предприятием на выбранную дату
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
          onClick={findContractsByDateAndOrg}
        >
          Search
        </button>
      </div>
      {foundedContracts &&
        (
          <Table>
            <>
              {foundedContracts.map((contract) => (
                <ContractCard
                  contract={contract}
                />
              ))}
            </>
          </Table>
        )}
    </div>
  );
};

type ContractCardProps = {
  contract: TaskRecord
}

const ContractCard = (props: ContractCardProps) => (
  <Row>
    <Item content={props.contract.contractId} center />
    <Item
      content={new Date(props.contract.creationDate).toDateString()}
      center
    />
    <Item
      content={new Date(props.contract.expirationDate).toDateString()}
      center
    />
    <Item content={props.contract.address} />
    <Item content={props.contract.organizationName} center />
  </Row>
);