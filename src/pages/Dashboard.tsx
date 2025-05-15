import { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHome from '@/components/dashboard/tabs/DashboardHome';
import DiagnosticTab from '@/components/dashboard/tabs/DiagnosticTab';
import PlansTab from '@/components/dashboard/tabs/PlansTab';
import MyCulturesTab from '@/components/dashboard/tabs/MyCulturesTab';
import ClimateTab from '@/components/dashboard/tabs/ClimateTab';
import ReportsTab from '@/components/dashboard/tabs/ReportsTab';
import MobileNav from '@/components/dashboard/MobileNav';
/* types */
import type { Crop, CultureForecast } from '@/types';
/* dados temporarios onde voce pode se basear para fazer a api */
import {
  initialCrops,
  forecastByCultureData,
  analysesData,
  selectedAnalysisDetailsData,
  diagnosticsData,
  cropsWithAnalyses,
  CropAndCultureMonitorData,
} from '@/data';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [forecastsByCulture, setForecastsByCulture] = useState<CultureForecast>(
    forecastByCultureData
  );

  useEffect(() => {
    /* fazer chamadas da api aqui para assim que abrir a tela admin primeira vez pegar os dados e setar dentro dos states */
    setForecastsByCulture(forecastByCultureData);
    console.log('abri tela de login');
  }, []);

  const addCrop = (newCrop: Omit<Crop, 'id'>) => {
    const id = newCrop.name.toLowerCase().replace(/\s+/g, '-');
    setCrops([...crops, { ...newCrop, id }]);
  };

  const removeCrop = (id: string) => {
    setCrops(crops.filter(crop => crop.id !== id));
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'culturas':
        return (
          <MyCulturesTab
            crops={crops}
            addCrop={addCrop}
            removeCrop={removeCrop}
          />
        );
      case 'diagnostico':
        return (
          <DiagnosticTab
            crops={crops}
            analysesData={analysesData}
            selectedAnalysisDetailsData={selectedAnalysisDetailsData}
            setSelectedTab={setSelectedTab}
            cropsWithAnalyses={cropsWithAnalyses}
          />
        );
      case 'clima':
        return (
          <ClimateTab
            crops={crops}
            setSelectedTab={setSelectedTab}
            forecastsByCulture={forecastsByCulture}
          />
        );
      case 'relatorios':
        return (
          <ReportsTab
            CropAndCultureMonitorData={CropAndCultureMonitorData}
            setSelectedTab={setSelectedTab}
          />
        );
      case 'planos':
        return <PlansTab />;
      case 'dashboard':
      default:
        return (
          <DashboardHome
            crops={crops}
            setSelectedTab={setSelectedTab}
            latestDiagnostics={diagnosticsData}
          />
        );
    }
  };

  return (
    <main className="flex flex-col md:flex-row">
      <DashboardSidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {/* mobile nav */}
      <MobileNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <section className="overflow-x-hidden flex-1">{renderContent()}</section>
    </main>
  );
};

export default Dashboard;
