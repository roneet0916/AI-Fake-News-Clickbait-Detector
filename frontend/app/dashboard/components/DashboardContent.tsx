import { useState, useEffect } from "react";
import api from "../../lib/api";
import Card from "../components/Card";
import { Card as SharedCard } from "../components/Card";

export default function DashboardContent() {
  const [models, setModels] = useState<any>(null);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [m, e] = await Promise.all([api.getModels(), api.getEvaluation()]);
        setModels(m);
        setEvaluation(e);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading system data...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Model Status */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Model Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models?.models?.map((m: any) => (
            <Card key={m.name}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-gray-600 text-sm">{m.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${m.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                  {m.available ? "Available" : "Training Required"}
                </span>
              </div>
            </Card>
          )) || <p>No model information available.</p>}
        </div>
      </section>

      {/* Evaluation Metrics */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Model Evaluation</h2>
        {evaluation?.fake_news_model ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Accuracy", value: evaluation.fake_news_model.accuracy },
              { label: "Precision", value: evaluation.fake_news_model.precision },
              { label: "F1-Score", value: evaluation.fake_news_model.f1_score },
            ].map((metric) => (
              <Card key={metric.label}>
                <p className="text-gray-600 text-sm">{metric.label}</p>
                <p className="text-3xl font-bold mt-1">{metric.value}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl p-8 text-center">
            <p className="text-gray-600">Models need to be trained first.</p>
            <p className="text-gray-500 text-sm mt-2">
              Run: <code className="bg-gray-200 px-2 py-1 rounded">python -m app.ml.train_fake_news</code>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
