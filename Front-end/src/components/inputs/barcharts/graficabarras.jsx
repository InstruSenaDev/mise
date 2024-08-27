// 'use client';

import { useState } from 'react';
import { BarChart, Card, Divider, Switch } from '@tremor/react';

const data = [
  {
    date: 'Jan 23',
    'Este Año': 60,
    'Año Anterior': 28,
  },
  {
    date: 'Feb 23',
    'Este Año': 70,
    'Año Anterior': 30,
  },
  {
    date: 'Mar 23',
    'Este Año': 80,
    'Año Anterior': 70,
  },
  {
    date: 'Apr 23',
    'Este Año': 55,
    'Año Anterior': 45,
  },
  {
    date: 'May 23',
    'Este Año': 56,
    'Año Anterior': 80,
  },
  {
    date: 'Jun 23',
    'Este Año': 100,
    'Año Anterior': 85,
  }
];

function valueFormatter(number) {
  return number.toLocaleString();
}

export default function Grafica() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <>
      <Card className="bg-greyBlack w-[35rem] rounded-xl border-greyBlack sm:mx-auto sm:max-w-2xl z-10">
        <h3 className="ml-1 mr-1 font-semibold text-white dark:text-dark-tremor-content-strong">
          Gráfica de empresas desarrolladas (2023-2024)
        </h3>
        <BarChart
          data={data}
          index="date"
          categories={
            showComparison ? ['Año Anterior', 'Este Año'] : ['Este Año']
          }
          colors={showComparison ? ['cyan', 'blue'] : ['blue']}
          valueFormatter={valueFormatter}
          yAxisWidth={50}
          yAxisDomain={[0, 100]} // Establecer el rango del eje Y de 0 a 100
          className="mt-6 hidden h-60 sm:block"
        />
        <BarChart
          data={data}
          index="date"
          categories={
            showComparison ? ['Año Anterior', 'Este Año'] : ['Este Año']
          }
          colors={showComparison ? ['cyan', 'blue'] : ['blue']}
          valueFormatter={valueFormatter}
          yAxisDomain={[0, 100]} // Establecer el rango del eje Y de 0 a 100
          showYAxis={false}
          className="mt-4 h-56 sm:hidden"
        />
        <Divider />
        <div className="mb-2 flex items-center space-x-3">
          <Switch
            id="comparison"
            onChange={() => setShowComparison(!showComparison)}
          />
          <label
            htmlFor="comparison"
            className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
          >
            Mostrar mismo periodo el año pasado
          </label>
        </div>
      </Card>
    </>
  );
}
