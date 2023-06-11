import fetch from "node-fetch";

interface AlpacaOutput {
  data: Array<string>;
  is_generating: boolean;
  duration: number;
  average_duration: number;
}

export default async function alpaca(
  input: string,
  instruct: string
): Promise<string> {
  const alpaca = await fetch("https://tloen-alpaca-lora.hf.space/run/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [instruct, input, 0.1, 0.75, 40, 4, 128],
    }),
  });

  const alpacaRes = (await alpaca.json()) as AlpacaOutput;

  return alpacaRes.data[0];
}
