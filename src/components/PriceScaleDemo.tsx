/**
 * PriceScaleDemo - Visual demonstration of dynamic price gradients
 * This component shows how prices are styled based on their value
 * Using Costa Rica-inspired color schemes
 */

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getPriceGradient, getPriceCategory } from './ui/price-utils';

const samplePrices = [
  { price: 120000, label: 'Económico' },
  { price: 200000, label: 'Accesible' },
  { price: 300000, label: 'Medio' },
  { price: 400000, label: 'Premium' },
  { price: 550000, label: 'Lujo' },
  { price: 750000, label: 'Ultra Premium' }
];

export function PriceScaleDemo() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Escala de Colores de Precios - Costa Rica</CardTitle>
        <p className="text-sm text-muted-foreground">
          Los precios bajos usan colores cálidos de Guanacaste (rojos, naranjas, amarillos).
          Los precios altos usan colores de bosques y océanos (verde esmeralda, turquesa).
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {samplePrices.map(({ price, label }) => {
          const style = getPriceGradient(price);
          const category = getPriceCategory(price);
          
          return (
            <div key={price} className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className={`${style.bgColor} px-4 py-2 rounded-lg ${style.borderColor} border-2 ${style.glowColor} inline-block`}>
                    <span className={`font-bold text-xl bg-gradient-to-r ${style.textGradient} bg-clip-text text-transparent`}>
                      ${price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{label}</div>
                    <div className="text-muted-foreground">{category}</div>
                  </div>
                </div>
              </div>
              
              {/* Visual gradient bar */}
              <div className="w-32 h-8 rounded-lg overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${style.gradient}`} />
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-border">
          <h4 className="font-semibold mb-2 text-sm">Rangos de Precio:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <span className="text-orange-600">Súper Accesible:</span> Menos de $150,000 - Colores cálidos intensos</li>
            <li>• <span className="text-amber-600">Accesible:</span> $150,000 - $250,000 - Naranjas y ámbar</li>
            <li>• <span className="text-lime-600">Valor Intermedio:</span> $250,000 - $350,000 - Transición verde</li>
            <li>• <span className="text-emerald-600">Premium:</span> $350,000 - $450,000 - Verde esmeralda</li>
            <li>• <span className="text-teal-600">Ultra Premium:</span> Más de $450,000 - Verde a turquesa</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
