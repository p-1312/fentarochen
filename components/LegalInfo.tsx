import React from 'react';
import { Shield, Scale, Server, Cpu } from 'lucide-react';

const LegalInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 md:p-12 pt-24">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Rechtliche Hinweise</h1>
          <p className="text-ocean-glow font-mono text-sm">Stand: {new Date().toLocaleDateString('de-DE')}</p>
        </div>

        {/* Impressum Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white mb-4">
            <Scale className="text-ocean-glow" />
            <h2 className="text-2xl font-bold">Impressum</h2>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Angaben gemäß § 5 TMG</h3>
              <p>Max Mustermann (Projektverantwortlicher)</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Kontakt</h3>
              <p>Telefon: +49 (0) 123 445566</p>
              <p>E-Mail: kontakt@fentarochen.net</p>
            </div>
            <div className="text-xs text-slate-500 italic mt-4">
              Hinweis: Dies ist ein fiktives Projekt-Impressum für die "FentaRochen" Web-Applikation unter fentarochen.net.
            </div>
          </div>
        </section>

        {/* Datenschutz Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white mb-4">
            <Shield className="text-ocean-glow" />
            <h2 className="text-2xl font-bold">Datenschutzerklärung</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
              <div className="flex items-start gap-3">
                <Server className="mt-1 text-bio-green flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">1. Hosting & Log-Files</h3>
                  <p className="text-sm leading-relaxed">
                    Diese Seite (fentarochen.net) wird bei einem externen Dienstleister gehostet (z.B. Vercel/Netlify). 
                    Der Provider erhebt automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (Browsertyp, Uhrzeit, IP-Adresse).
                    Dies dient der technischen Stabilität und Sicherheit.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 border-l-4 border-l-ocean-glow">
              <div className="flex items-start gap-3">
                <Cpu className="mt-1 text-ocean-glow flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">2. Künstliche Intelligenz (Google Gemini API)</h3>
                  <p className="text-sm leading-relaxed mb-3">
                    Diese Anwendung nutzt die <strong>Google Gemini API</strong> (bereitgestellt von Google LLC), um Chat-Antworten und Bilder zu generieren.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-2 text-slate-400 ml-1">
                    <li>
                      <strong className="text-slate-200">Datenübermittlung:</strong> Wenn Sie eine Nachricht in den Chat eingeben ("Comms") oder ein Bild generieren ("Vision"), wird Ihr Textinhalt an die Server von Google gesendet.
                    </li>
                    <li>
                      <strong className="text-slate-200">Verarbeitung:</strong> Google verarbeitet diese Daten, um die Antwort zu generieren. Geben Sie keine persönlichen Daten (Namen, Adressen, Passwörter) in das Chat-Feld ein.
                    </li>
                    <li>
                      <strong className="text-slate-200">Speicherung:</strong> Innerhalb dieser Web-Applikation werden Chat-Verläufe nur temporär im Arbeitsspeicher Ihres Browsers gehalten und beim Neuladen gelöscht (sofern nicht anders angegeben).
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-4">
                    Weitere Informationen finden Sie in der <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-ocean-glow hover:underline">Datenschutzerklärung von Google</a>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">3. Ihre Rechte</h3>
              <p className="text-sm leading-relaxed">
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LegalInfo;