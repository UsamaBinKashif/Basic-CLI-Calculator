#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import ora from "ora";

const calcAscii: any = ` 
 ______________________
|  __________________  |
| | CLI              | |
| | CALCULATOR       | |
| | BY               | |
| | USAMA BIN KASHIF | |
| |__________________| |
|  ___ ___ ___   ___   |
| | 7 | 8 | 9 | | + |  |
| |___|___|___| |___|  |
| | 4 | 5 | 6 | | - |  |
| |___|___|___| |___|  |
| | 1 | 2 | 3 | | x |  |
| |___|___|___| |___|  |
| | . | 0 | = | | / |  |
| |___|___|___| |___|  |
|______________________|
\n`;

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};
async function welcome() {
  const rainbow = chalkAnimation.neon(`${calcAscii} `);
  await sleep();
  rainbow.stop();
  const spinner = ora(`${chalk.green("Loading...")}`).start();
  await sleep();
  spinner.stop();
}

await welcome();

async function askQuestion() {
  const spinner = ora(`${chalk.green("Loading...")}`).start();
  await sleep();
  spinner.stop();
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "operator",
      message: chalk.bgGreenBright.bold.black(
        "Which mathemetical do you want operation to perform ?"
      ),
      choices: ["Division", "Multiplication", "Addition", "Subtraction"],
    },
    {
      type: "input",
      name: "num1",
      message: chalk.red("Enter 1st Number: "),
      validate(input) {
        if (!isNaN(input)) {
          return true;
        }

        throw Error("Please provide a valid Number.");
      },
    },
    {
      type: "input",
      name: "num2",
      message: chalk.red("Enter 2nd Number: "),
      validate(input) {
        if (!isNaN(input)) {
          return true;
        }

        throw Error("Please provide a valid Number.");
      },
    },
  ]);

  if (answer.operator === "Division")
    console.log(
      `\nAnswer of `,
      chalk.red(
        `${answer.num1} ÷ ${answer.num2} = ${
          Number(answer.num1) / Number(answer.num2)
        }\n`
      )
    );
  if (answer.operator === "Multiplication")
    console.log(
      `\nAnswer of `,
      chalk.red(
        `${answer.num1} x ${answer.num2} = ${
          Number(answer.num1) * Number(answer.num2)
        }\n`
      )
    );
  if (answer.operator === "Addition")
    console.log(
      `\nAnswer of `,
      chalk.red(
        `${answer.num1} + ${answer.num2} = ${
          Number(answer.num1) + Number(answer.num2)
        }\n`
      )
    );
  if (answer.operator === "Subtraction")
    console.log(
      `\nAnswer of `,
      chalk.red(
        `${answer.num1} - ${answer.num2} = ${
          Number(answer.num1) - Number(answer.num2)
        }\n`
      )
    );
}

async function toContinue() {
  do {
    await askQuestion();
    var again = await inquirer.prompt({
      type: "input",
      name: "restart",
      message: chalk.bgBlackBright.white("Do you want to perfom another calculation (y/n):"),
    });
  } while (
    again.restart === "y" ||
    again.restart === "Y" ||
    again.restart === "yes" ||
    again.restart === "YES"
  );
}

toContinue();
