import { supabase } from "db/supabase/supabase";
import { useState } from "preact/hooks";
import Row from "components/commons/Row";
import Item from "components/commons/Item";
import Table from "components/commons/Table";
import type { InsuranceContract } from "./View";

type Task3CardProps = { contracts: InsuranceContract[] };

interface InsuredEmploye {
  id: number;
  age: number;
  fullName: string;
  organizationId: number;
  riskCategory: string;
  EmployeesInContract: {
    InsuranceContract: {
      Organization: {
        fullName: string;
      } | null;
    } | null;
  }[];
}

type RiskCategory =
  | "LowRisk"
  | "MediumRisk"
  | "ModerateRisk"
  | "HighRisk"
  | "VeryHighRisk";

interface InsuredEmployeEx {
  id: number;
  age: number;
  fullName: string;
  organizationId: number;
  riskCategory: RiskCategory;
  cost: number;
  orgName: string;
}

type TaskRecord = {
  fullName: string,
	employeeCategory: RiskCategory,
	payment: number,
	paymentDate: string
}

export const Task3Card = (props: Task3CardProps) => {
  const [insuredEmploye, setInsuredEmploye] = useState<
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

  const findInsuredEmployeByDateAndOrg = async () => {
    if (date) {
      const { data } = await supabase.rpc("getInsurancePaymentsByDate", {
        selecteddate: date,
      });
      setInsuredEmploye(data as TaskRecord[]);

      // const f = kek?.map((d) => ({
      //   ...d,
      //   cost: d.EmployeesPaymentsInContract[0].InsuranceContract
      //     ?.InsuranceContractPaymants.filter((s) =>
      //       s.riskCategory === d.riskCategory
      //     )[0].cost,
      //   orgName: d.EmployeesPaymentsInContract[0].InsuranceContract
      //     ?.Organization?.fullName,
      // } as InsuredEmployeEx));
    }
  };
  console.log("fsdfs:", props.contracts);
  return (
    <div class={"flex flex-col border p-2 mt-10 gap-2"}>
      <p>
        Просмотр списка страховых выплат для каждой категории работников на
        выбранную дату – дата, категория работника, страховая выплата
      </p>
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
        className="w-15 bg-[#D0E7D2] p-1 rounded ml-auto"
        onClick={findInsuredEmployeByDateAndOrg}
      >
        Search
      </button>

      {insuredEmploye &&
        (
          <>
            <h2>LowRisk</h2>
            <Table>
              <>
                <InsuredEmployeHeaderCard />
                {insuredEmploye.filter((insuredEmploye) =>
                  insuredEmploye.employeeCategory == "LowRisk"
                ).map((insuredEmploye) => (
                  <InsuredEmployeCard insuredEmploye={insuredEmploye} />
                ))}
              </>
            </Table>

            <h2>MediumRisk</h2>
            <Table>
              <>
                <InsuredEmployeHeaderCard />
                {insuredEmploye.filter((insuredEmploye) =>
                  insuredEmploye.employeeCategory == "MediumRisk"
                ).map((insuredEmploye) => (
                  <InsuredEmployeCard insuredEmploye={insuredEmploye} />
                ))}
              </>
            </Table>
            <h2>ModerateRisk</h2>
            <Table>
              <>
                <InsuredEmployeHeaderCard />
                {insuredEmploye.filter((insuredEmploye) =>
                  insuredEmploye.employeeCategory == "ModerateRisk"
                ).map((insuredEmploye) => (
                  <InsuredEmployeCard insuredEmploye={insuredEmploye} />
                ))}
              </>
            </Table>
            <h2>HighRisk</h2>
            <Table>
              <>
                <InsuredEmployeHeaderCard />
                {insuredEmploye.filter((insuredEmploye) =>
                  insuredEmploye.employeeCategory == "HighRisk"
                ).map((insuredEmploye) => (
                  <InsuredEmployeCard insuredEmploye={insuredEmploye} />
                ))}
              </>
            </Table>

            <h2>VeryHighRisk</h2>
            <Table>
              <>
                <InsuredEmployeHeaderCard />
                {insuredEmploye.filter((insuredEmploye) =>
                  insuredEmploye.employeeCategory == "VeryHighRisk"
                ).map((insuredEmploye) => (
                  <InsuredEmployeCard insuredEmploye={insuredEmploye} />
                ))}
              </>
            </Table>
          </>
        )}
    </div>
  );
};

type InsuredEmployeCardProps = {
  insuredEmploye: TaskRecord;
};

const InsuredEmployeCard = (props: InsuredEmployeCardProps) => (
  <Row>
    <Item content={props.insuredEmploye.fullName} center />
    <Item content={props.insuredEmploye.employeeCategory} />
    <Item content={props.insuredEmploye.payment} />
    <Item content={props.insuredEmploye.paymentDate} monospace />
  </Row>
);

const InsuredEmployeHeaderCard = () => (
  <Row>
    <Item content="Full name" />
    <Item content="Risk" />
    <Item content="Payment" />
    <Item content="Paid At" />
  </Row>
);
