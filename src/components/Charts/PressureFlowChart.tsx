import React from 'react';
import { PatientData } from '../../data/urodynamicData';

interface PressureFlowChartProps {
  data: PatientData;
  width?: number;
  height?: number;
}

export default function PressureFlowChart({ data, width = 400, height = 300 }: PressureFlowChartProps) {
  const { etudePressionDebit, debitMetrie } = data;
  
  // Génération des points pression-débit
  const generatePressureFlowPoints = () => {
    const points: { x: number; y: number }[] = [];
    const maxFlow = debitMetrie.qMax;
    const pDetQmax = etudePressionDebit.pressionDetrusorQmax;
    
    // Simulation d'une courbe pression-débit réaliste
    for (let flow = 0; flow <= maxFlow * 1.2; flow += 0.5) {
      let pressure;
      
      if (flow === 0) {
        pressure = 0;
      } else if (flow <= maxFlow) {
        // Relation pression-débit normale
        const ratio = flow / maxFlow;
        pressure = pDetQmax * (0.3 + 0.7 * ratio);
      } else {
        // Extrapolation au-delà du Qmax
        pressure = pDetQmax * (1 + 0.5 * (flow - maxFlow) / maxFlow);
      }
      
      points.push({ x: flow, y: pressure });
    }
    
    return points;
  };

  const points = generatePressureFlowPoints();
  const maxPressure = Math.max(...points.map(p => p.y), 100);
  const maxFlowDisplay = Math.max(debitMetrie.qMax * 1.5, 30);
  
  const scaleX = (width - 80) / maxFlowDisplay;
  const scaleY = (height - 80) / maxPressure;

  const pathData = points
    .map((point, index) => {
      const x = 60 + point.x * scaleX;
      const y = height - 40 - point.y * scaleY;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Nomogrammes de référence
  const schaferLines = [
    { name: 'Obstruction forte', points: [[0, 40], [10, 60], [20, 80], [30, 100]] },
    { name: 'Obstruction modérée', points: [[0, 20], [10, 35], [20, 50], [30, 65]] },
    { name: 'Normal', points: [[0, 10], [10, 20], [20, 30], [30, 40]] }
  ];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Graphique Pression-Débit</h4>
      <svg width={width} height={height} className="border border-gray-100">
        {/* Grille */}
        <defs>
          <pattern id="pressureGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#pressureGrid)" />
        
        {/* Axes */}
        <line x1="60" y1={height - 40} x2={width - 20} y2={height - 40} stroke="#374151" strokeWidth="2" />
        <line x1="60" y1="20" x2="60" y2={height - 40} stroke="#374151" strokeWidth="2" />
        
        {/* Labels des axes */}
        <text x={width / 2} y={height - 10} textAnchor="middle" className="text-sm fill-gray-600">
          Débit (ml/s)
        </text>
        <text x="20" y={height / 2} textAnchor="middle" className="text-sm fill-gray-600" transform={`rotate(-90, 20, ${height / 2})`}>
          Pression détrusor (cmH2O)
        </text>
        
        {/* Graduations X */}
        {Array.from({ length: Math.ceil(maxFlowDisplay / 5) + 1 }, (_, i) => i * 5).map(flow => (
          <g key={flow}>
            <line x1={60 + flow * scaleX} y1={height - 40} x2={60 + flow * scaleX} y2={height - 35} stroke="#374151" />
            <text x={60 + flow * scaleX} y={height - 25} textAnchor="middle" className="text-xs fill-gray-500">
              {flow}
            </text>
          </g>
        ))}
        
        {/* Graduations Y */}
        {Array.from({ length: Math.ceil(maxPressure / 20) + 1 }, (_, i) => i * 20).map(pressure => (
          <g key={pressure}>
            <line x1="55" y1={height - 40 - pressure * scaleY} x2="60" y2={height - 40 - pressure * scaleY} stroke="#374151" />
            <text x="50" y={height - 36 - pressure * scaleY} textAnchor="end" className="text-xs fill-gray-500">
              {pressure}
            </text>
          </g>
        ))}
        
        {/* Lignes de référence Schafer */}
        {schaferLines.map((line, index) => {
          const color = index === 0 ? '#EF4444' : index === 1 ? '#F59E0B' : '#10B981';
          const pathRef = line.points
            .map((point, i) => {
              const x = 60 + point[0] * scaleX;
              const y = height - 40 - point[1] * scaleY;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
          
          return (
            <g key={line.name}>
              <path d={pathRef} fill="none" stroke={color} strokeWidth="2" strokeDasharray="5,5" opacity="0.7" />
              <text 
                x={60 + line.points[line.points.length - 1][0] * scaleX + 5} 
                y={height - 40 - line.points[line.points.length - 1][1] * scaleY} 
                className="text-xs" 
                fill={color}
              >
                {line.name}
              </text>
            </g>
          );
        })}
        
        {/* Courbe du patient */}
        <path d={pathData} fill="none" stroke="#3B82F6" strokeWidth="4" />
        
        {/* Point Qmax */}
        <circle 
          cx={60 + debitMetrie.qMax * scaleX} 
          cy={height - 40 - etudePressionDebit.pressionDetrusorQmax * scaleY} 
          r="6" 
          fill="#DC2626" 
          stroke="white"
          strokeWidth="2"
        />
        <text 
          x={60 + debitMetrie.qMax * scaleX + 10} 
          y={height - 40 - etudePressionDebit.pressionDetrusorQmax * scaleY - 10} 
          className="text-xs fill-red-600 font-semibold"
        >
          Qmax: {debitMetrie.qMax} ml/s
        </text>
        <text 
          x={60 + debitMetrie.qMax * scaleX + 10} 
          y={height - 40 - etudePressionDebit.pressionDetrusorQmax * scaleY + 5} 
          className="text-xs fill-red-600 font-semibold"
        >
          Pdet: {etudePressionDebit.pressionDetrusorQmax} cmH2O
        </text>
      </svg>
      
      {/* Indices calculés */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Index d'obstruction:</span> {etudePressionDebit.indexObstruction}
        </div>
        <div>
          <span className="font-medium">Index de contractilité:</span> {etudePressionDebit.indexContractilite}
        </div>
        <div>
          <span className="font-medium">Résistance urétrale:</span> {etudePressionDebit.resistanceUretrale}
        </div>
        <div>
          <span className="font-medium">Conductance urétrale:</span> {etudePressionDebit.conductanceUretrale}
        </div>
      </div>
    </div>
  );
}