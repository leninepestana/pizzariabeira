import { canSSRauth } from "../../utils/canSSRAuth";
export default function Dashboard() {
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
    </div>
  );
}

export const getServerSideProps = canSSRauth(async (ctx) => {
  return { props: {} };
});
