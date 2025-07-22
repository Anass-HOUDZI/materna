
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Layout } from '@/components/ui/Layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MedicalReport } from '@/types/symptom-journal';
import { SYMPTOM_TEMPLATES, SYMPTOM_CATEGORIES } from '@/data/symptom-catalog';
import { Download, FileText, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';

interface MedicalReportGeneratorProps {
  onGenerateReport: (startDate: string, endDate: string) => MedicalReport;
}

export default function MedicalReportGenerator({ onGenerateReport }: MedicalReportGeneratorProps) {
  const [dateRange, setDateRange] = useState({
    start: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date.toISOString().split('T')[0];
    })(),
    end: new Date().toISOString().split('T')[0]
  });
  const [report, setReport] = useState<MedicalReport | null>(null);

  const handleGenerateReport = () => {
    const newReport = onGenerateReport(dateRange.start, dateRange.end);
    setReport(newReport);
  };

  const handleExportPDF = () => {
    if (!report) return;
    
    // Créer le contenu HTML pour l'export
    const content = `
      <html>
        <head>
          <title>Rapport Médical - Journal des Symptômes</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .alert { background: #fef2f2; border: 1px solid #fecaca; padding: 10px; border-radius: 5px; }
            .pattern { background: #f0f9ff; border: 1px solid #bae6fd; padding: 10px; border-radius: 5px; margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Rapport Médical - Journal des Symptômes de Grossesse</h1>
            <p><strong>Période:</strong> ${new Date(report.period.start).toLocaleDateString('fr-FR')} - ${new Date(report.period.end).toLocaleDateString('fr-FR')}</p>
            <p><strong>Généré le:</strong> ${new Date(report.generatedAt).toLocaleDateString('fr-FR')} à ${new Date(report.generatedAt).toLocaleTimeString('fr-FR')}</p>
          </div>
          
          <div class="section">
            <h2>Résumé</h2>
            <p>${report.summary}</p>
          </div>
          
          ${report.alerts.length > 0 ? `
            <div class="section">
              <h2>Points d'attention</h2>
              ${report.alerts.map(alert => `<div class="alert">⚠️ ${alert}</div>`).join('')}
            </div>
          ` : ''}
          
          <div class="section">
            <h2>Symptômes enregistrés (${report.symptoms.length})</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Symptôme</th>
                  <th>Intensité</th>
                  <th>Durée</th>
                  <th>Déclencheurs</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${report.symptoms.map(symptom => {
                  const symptomTemplate = SYMPTOM_TEMPLATES.find(s => s.id === symptom.symptomId);
                  return `
                    <tr>
                      <td>${new Date(symptom.date).toLocaleDateString('fr-FR')}</td>
                      <td>${symptomTemplate?.name || symptom.symptomId}</td>
                      <td>${symptom.intensity}/10</td>
                      <td>${symptom.duration}</td>
                      <td>${symptom.triggers?.join(', ') || '-'}</td>
                      <td>${symptom.notes || '-'}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
          
          ${report.patterns.length > 0 ? `
            <div class="section">
              <h2>Tendances identifiées</h2>
              ${report.patterns.map(pattern => {
                const symptomTemplate = SYMPTOM_TEMPLATES.find(s => s.id === pattern.symptomId);
                return `
                  <div class="pattern">
                    <h3>${symptomTemplate?.name}</h3>
                    <p><strong>Fréquence:</strong> ${pattern.frequency.toFixed(1)} fois par semaine</p>
                    <p><strong>Intensité moyenne:</strong> ${pattern.averageIntensity.toFixed(1)}/10</p>
                    <p><strong>Tendance:</strong> ${pattern.trendDirection === 'increasing' ? 'En hausse' : pattern.trendDirection === 'decreasing' ? 'En baisse' : 'Stable'}</p>
                    ${pattern.commonTriggers.length > 0 ? `<p><strong>Déclencheurs fréquents:</strong> ${pattern.commonTriggers.join(', ')}</p>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </body>
      </html>
    `;

    // Ouvrir dans une nouvelle fenêtre pour impression
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration du rapport */}
      <Card variant="elevated" size="md">
        <Layout direction="column" gap="md">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Générer un rapport médical</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateReport}
            variant="primary"
            icon={<FileText className="h-4 w-4" />}
          >
            Générer le rapport
          </Button>
        </Layout>
      </Card>

      {/* Aperçu du rapport */}
      {report && (
        <Card variant="elevated" size="lg">
          <Layout direction="column" gap="lg">
            {/* En-tête */}
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold bg-clip-text text-transparent" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Rapport médical</h2>
              <div className="text-sm text-slate-600 mt-1">
                <div>Période: {new Date(report.period.start).toLocaleDateString('fr-FR')} - {new Date(report.period.end).toLocaleDateString('fr-FR')}</div>
                <div>Généré le: {new Date(report.generatedAt).toLocaleDateString('fr-FR')} à {new Date(report.generatedAt).toLocaleTimeString('fr-FR')}</div>
              </div>
            </div>

            {/* Résumé */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Résumé</h3>
              <p className="text-slate-700">{report.summary}</p>
            </div>

            {/* Alertes */}
            {report.alerts.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Points d'attention
                </h3>
                <div className="space-y-2">
                  {report.alerts.map((alert, index) => (
                    <div key={index} className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-orange-800 text-sm">{alert}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tendances */}
            {report.patterns.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  Tendances identifiées
                </h3>
                <div className="space-y-2">
                  {report.patterns.map(pattern => {
                    const symptom = SYMPTOM_TEMPLATES.find(s => s.id === pattern.symptomId);
                    const category = symptom ? SYMPTOM_CATEGORIES.find(c => c.id === symptom.category) : null;
                    
                    return (
                      <div key={pattern.symptomId} className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{category?.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-slate-800">{symptom?.name}</div>
                            <div className="text-sm text-slate-600 mt-1">
                              Fréquence: {pattern.frequency.toFixed(1)} fois/semaine • 
                              Intensité moyenne: {pattern.averageIntensity.toFixed(1)}/10 • 
                              Tendance: {pattern.trendDirection === 'increasing' ? 'En hausse' : pattern.trendDirection === 'decreasing' ? 'En baisse' : 'Stable'}
                            </div>
                            {pattern.commonTriggers.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="text-xs text-slate-600">Déclencheurs fréquents:</span>
                                {pattern.commonTriggers.map(trigger => (
                                  <Badge key={trigger} variant="secondary" className="text-xs">
                                    {trigger}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Statistiques */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Statistiques</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">{report.symptoms.length}</div>
                  <div className="text-xs text-slate-600">Symptômes enregistrés</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">{new Set(report.symptoms.map(s => s.symptomId)).size}</div>
                  <div className="text-xs text-slate-600">Types différents</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">
                    {report.symptoms.length > 0 ? (report.symptoms.reduce((sum, s) => sum + s.intensity, 0) / report.symptoms.length).toFixed(1) : 0}
                  </div>
                  <div className="text-xs text-slate-600">Intensité moyenne</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-orange-600">{report.patterns.length}</div>
                  <div className="text-xs text-slate-600">Tendances détectées</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-slate-200 pt-4">
              <Layout direction="row" gap="md" justify="center">
                <Button 
                  onClick={handleExportPDF}
                  variant="primary"
                  icon={<Download className="h-4 w-4" />}
                >
                  Exporter en PDF
                </Button>
                <Button 
                  onClick={() => setReport(null)}
                  variant="outline"
                >
                  Fermer
                </Button>
              </Layout>
            </div>
          </Layout>
        </Card>
      )}
    </div>
  );
}
