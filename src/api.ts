import mockData from "./mockData.json";

let cursor = -1;
const size = 10;

function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

export interface PersonInfoDto {
  id: string,
  jobTitle: string,
  emailAddress: string,
  firstNameLastName: string
}

export default async function apiData(): Promise<PersonInfoDto[]> {
  await delay(1000);
  if (Math.random() > 0.7) {
    throw new Error("Something went wrong");
  }
  cursor += 1;
  const start = cursor * size;
  const end = cursor * size + size;
  return mockData.slice(start, end);
}
