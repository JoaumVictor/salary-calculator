"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import Image from "next/image";
import bunnyImage from "../assets/images/bunny-money.gif";
import patinhas from "../assets/images/patinhas.gif";
import esmola from "../assets/images/esmola.gif";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const formatValueInReais = (value: number) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const calculate = () => {
    if (!mySalary) return alert("Digite um valor válido!");
    setScreen("calculator");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setFirstCalculate(true);
  };

  const [screen, setScreen] = useState<"home" | "calculator">("home");
  const [mySalary, setMySalary] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [firstCalculate, setFirstCalculate] = useState<boolean>(false);

  return (
    <main className="flex w-full h-[100vh] flex-col items-center text-center justify-center">
      {screen === "home" ? (
        <div className="flex w-full h-full flex-col items-center text-center justify-center">
          <h1 className="text-4xl my-10">
            Hey dev, bem vindo a calculadora de salário!
          </h1>
          <p className="text-[26px]">Pra começar digite seu salário mensal:</p>
          <input
            onChange={(e) => {
              setMySalary(Number(e.target.value));
            }}
            value={mySalary}
            className="w-[250px] rounded-[8px] my-10 text-black text-center text-4xl out h-[60px] outline-none cursor-pointer"
            type="number"
          />
          <button
            onClick={calculate}
            className="border pl-4 border-white p-[10px] rounded-[8px] text-[26px] my-[20px]"
          >
            Calcular
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full h-[100vh] justify-center">
          {loading && (
            <div className="relative h-[380px] w-[550px] mx-auto">
              <Image fill src={bunnyImage} alt="bunny money" />
            </div>
          )}
          {firstCalculate && !loading && mySalary && (
            <div className="flex items-center justify-center flex-col">
              <button
                className="border pl-4 border-white p-[10px] rounded-[8px] text-[26px] my-[20px]"
                onClick={() => setScreen("home")}
              >
                Calcular novamente
              </button>
              <p className="text-[26px]">
                Seu salário anual é:{" "}
                <span className="text-[26px] font-bold text-yellow-300">
                  {formatValueInReais(mySalary * 12)}
                </span>
              </p>
              <p className="text-[26px]">
                Seu salário mensal é:{" "}
                <span className="text-[26px] font-bold text-yellow-300">
                  {formatValueInReais(mySalary)}
                </span>
              </p>
              <p className="text-[26px]">
                Seu salário semanal é:{" "}
                <span className="text-[26px] font-bold text-yellow-300">
                  {formatValueInReais(mySalary / 4)}
                </span>
              </p>
              <p className="text-[26px]">
                Seu salário diário é:{" "}
                <span className="text-[26px] font-bold text-yellow-300">
                  {formatValueInReais(mySalary / 30)}
                </span>
              </p>
              <p className="text-[26px]">
                Seu salário por hora é:{" "}
                <span className="text-[26px] font-bold text-yellow-300">
                  {formatValueInReais(mySalary / 220)}
                </span>{" "}
                <p className="text-teal-400">
                  Considerando que você trabalha 8 horas por dia!✨
                </p>
              </p>
              {mySalary / 220 > 20 && (
                <div className="my-[20px] h-[380px] w-[550px] mx-auto relative">
                  <Image fill src={patinhas} alt="patinhas" />
                </div>
              )}
              {mySalary / 220 < 6 && (
                <div className="my-[20px] h-[380px] w-[550px] mx-auto relative">
                  <Image fill src={esmola} alt="cara pedindo esmola" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
