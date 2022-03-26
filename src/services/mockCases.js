export let mockCases = [
  {
    day: "18/03/2022",
    cases: 1874851,
  },
  {
    day: "19/03/2022",
    cases: 1580400,
  },
  {
    day: "20/03/2022",
    cases: 1023616,
  },
  {
    day: "21/03/2022",
    cases: 1379315,
  },
  {
    day: "22/03/2022",
    cases: 1998171,
  },
  {
    day: "23/03/2022",
    cases: 1643842,
  },
  {
    day: "24/03/2022",
    cases: 1581260,
  },
];

export const resetArray = () => {
  mockCases = mockCases.splice(0, 7);
};
