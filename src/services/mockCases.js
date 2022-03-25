export let mockCases = [
  {
    day: "19/03/2022",
    cases: 2054283,
  },
  {
    day: "20/03/2022",
    cases: 1874851,
  },
  {
    day: "21/03/2022",
    cases: 1580400,
  },
  {
    day: "22/03/2022",
    cases: 1023616,
  },
  {
    day: "23/03/2022",
    cases: 1379315,
  },
  {
    day: "24/03/2022",
    cases: 1998171,
  },
  {
    day: "25/03/2022",
    cases: 1643842,
  },
];

export const resetArray = () => {
  mockCases = mockCases.splice(0, 7);
};
