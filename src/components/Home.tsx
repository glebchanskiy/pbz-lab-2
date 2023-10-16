import ButtonPrimary from "components/commons/ButtonPrimary";

const Home = () => {

 const goTo = (href: string) => {
  window.location.href='http://localhost:3000' + href
 }

 return (
  <div class={'w-[500px] mx-auto mt-[20%] flex flex-col gap-5'}>
   <ButtonPrimary value='Organizations' onClick={() => goTo('/organizations')} />
   <ButtonPrimary value='Insured employers' onClick={() => goTo('/employers')} />
   <ButtonPrimary value='Insurance agents' onClick={() => goTo('/agents')} />
   <ButtonPrimary value='Contracts' onClick={() => goTo('/contracts')} />
  </div>
 )
}

export default Home
