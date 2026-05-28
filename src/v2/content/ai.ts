import type { AIContent } from "./types";

export const ai: AIContent = {
  paragraphs: [
    "AI is becoming a real part of marketing automation platforms. Salesforce shipped Agentforce, predictive sends and AI scoring are common, automated content variants are starting to land. I'm working through what these primitives can actually do on a client program versus what they look good doing in a demo.",
    "On the side, I run local LLMs on my own hardware (Ollama, llama.cpp). Mostly to learn the tooling: how quantization affects quality, what runs well on a consumer GPU, and what's actually possible with small fine-tunes when you don't have a data centre behind you.",
    "I'm not pretending to be an AI researcher. I'm a marketing automation engineer paying attention, because agentic systems are going to change what a 'campaign' looks like within a few years and I'd rather be ready than catch up.",
  ],
  certs: ["Salesforce Certified Agentforce Specialist", "Salesforce Certified AI Associate"],
  currentlyExploring: [
    "agentforce on real customer journeys",
    "claude code as a daily driver for sfmc dev work",
    "genai-assisted ampscript and ssjs authoring",
    "running local llms (ollama, llama.cpp) on consumer hardware",
    "small fine-tunes on consumer gpus to learn the quantization stack",
  ],
  closingLine: "Learning fast, not claiming the expert badge. The honesty matters.",
};
