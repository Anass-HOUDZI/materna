
// Page d’accueil MomTech Suite avec premier aperçu du portail + sidebar/catégories
import AppSidebar from "@/components/app-sidebar"

const WELCOME = [
  "Bienvenue sur MomTech Suite 👶",
  "",
  "50 outils santé, grossesse, bébé, sécurité et parentalité 100% offline, gratuits, privacy-first.",
  "Sélectionnez une catégorie pour commencer !"
];

const Index = () => (
  <div className="min-h-screen flex bg-background">
    <AppSidebar />
    <main className="flex-1 flex flex-col items-center justify-center">
      <div className="max-w-xl text-center space-y-4">
        {WELCOME.map((line, idx) => (
          <p key={idx} className={idx === 0 ? "text-4xl font-bold mb-4" : "text-lg text-muted-foreground"}>
            {line}
          </p>
        ))}
      </div>
    </main>
  </div>
);

export default Index;
