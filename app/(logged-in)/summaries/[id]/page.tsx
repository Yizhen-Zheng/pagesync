/**
 *
 * @param props
 * @returns
 * what is Partial render: part static
 * why async:
 * await for nextjs to parse URL segments and extract dynamic params([whatever in bracket])
 * and resolve async operations in routing process
 * then returns param obj
 */
export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  console.log(params);
  return <div>s</div>;
}
