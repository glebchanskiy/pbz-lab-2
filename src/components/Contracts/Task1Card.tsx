import { supabase } from "db/supabase/supabase";
import { useState } from "preact/hooks";
import { ContractCard, type InsuranceContract } from "./View";
import Table from "components/commons/Table";

type Task1CardProps = {
  contracts: InsuranceContract[];
};

export const Task1Card = (props: Task1CardProps) => {
  const [foundedContracts, setFoundedContracts] = useState<
    InsuranceContract[] | undefined
  >(
    undefined,
  );

  const [date, setDate] = useState<Date | undefined>();
  const [organizationName, setOrganizationName] = useState<string>();

  const changeDate = (e: Event) => {
    const date = (e.target as HTMLInputElement).value;
    setDate(new Date(date));
  };

  const findContractsByDateAndOrg = async () => {
    if (organizationName && date) {
      const { data } = await supabase.from("InsuranceContract").select(
        "*, Organization!inner(*), InsuranceAgent!inner (*), InsuranceContractPaymants!inner(*)",
      ).eq("Organization.fullName", organizationName)
      .filter('expirationDate', 'gte', date.toISOString())
      .filter('creationDate', 'lte', date.toISOString());

      console.log(data)

      console.log("date: ", date)
      console.log("date: ", new Date(date).toISOString())
      console.log("date: ", new Date(date).toUTCString())
      if (data)
        setFoundedContracts(data)
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
