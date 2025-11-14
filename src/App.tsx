import { useState } from 'react';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';

type ProbabilityMode = 'percentage' | 'fraction';

export default function App() {
  const [probabilityMode, setProbabilityMode] = useState<ProbabilityMode>('percentage');
  const [percentage, setPercentage] = useState('');
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [trials, setTrials] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleExecute = () => {
    let prob = 0;
    
    if (probabilityMode === 'percentage') {
      prob = parseFloat(percentage) / 100;
    } else {
      const num = parseFloat(numerator);
      const denom = parseFloat(denominator);
      if (!isNaN(num) && !isNaN(denom) && denom !== 0) {
        prob = num / denom;
      }
    }
    
    const trial = parseFloat(trials);
    
    if (!isNaN(prob) && !isNaN(trial)) {
      const calculatedResult = Math.pow(1 - prob, trial);
      const finalResult = 100 - (calculatedResult * 100);
      setResult(finalResult);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-white/20">
        <div className="grid grid-cols-2 gap-x-16 gap-y-8">
          {/* 左側 */}
          <div className="space-y-8">
            {/* 確率 */}
            <div className="space-y-3">
              <Label>確率</Label>
              
              {/* 切り替えボタン */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={probabilityMode === 'percentage' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProbabilityMode('percentage')}
                  className="flex-1"
                >
                  パーセント
                </Button>
                <Button
                  type="button"
                  variant={probabilityMode === 'fraction' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProbabilityMode('fraction')}
                  className="flex-1"
                >
                  分数
                </Button>
              </div>

              {/* パーセント入力 */}
              {probabilityMode === 'percentage' && (
                <div className="relative">
                  <Input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="bg-gray-100 border-gray-300 pr-10"
                    placeholder="0"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              )}

              {/* 分数入力 */}
              {probabilityMode === 'fraction' && (
                <div className="space-y-2">
                  <div className="space-y-1">
                    <span className="text-sm text-gray-600">分子</span>
                    <Input
                      type="number"
                      value={numerator}
                      onChange={(e) => setNumerator(e.target.value)}
                      className="bg-gray-100 border-gray-300"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-gray-600">分母</span>
                    <Input
                      type="number"
                      value={denominator}
                      onChange={(e) => setDenominator(e.target.value)}
                      className="bg-gray-100 border-gray-300"
                      placeholder="0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 試行回数 */}
            <div className="space-y-2">
              <Label htmlFor="trials">試行回数</Label>
              <div className="relative">
                <Input
                  id="trials"
                  type="number"
                  value={trials}
                  onChange={(e) => setTrials(e.target.value)}
                  className="bg-gray-100 border-gray-300 pr-10"
                  placeholder=""
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  回
                </span>
              </div>
            </div>
          </div>

          {/* 右側 - 結果表示 */}
          <div className="space-y-8">
            <div className="space-y-2">
              <Label>結果</Label>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-8 flex items-center justify-center min-h-[120px]">
                {result !== null ? (
                  <div className="text-center">
                    <div className="text-4xl text-blue-900 mb-1">
                      {result.toFixed(2)}%
                    </div>
                    <div className="text-sm text-blue-600">確率</div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">
                    実行ボタンを押すと
                    <br />
                    結果が表示されます
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 実行ボタン */}
          <div className="col-span-2 flex justify-center pt-4">
            <Button 
              onClick={handleExecute} 
              className="px-12 bg-black hover:bg-black/90 text-white"
            >
              実行
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}