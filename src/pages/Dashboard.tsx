import { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHome from '@/components/dashboard/tabs/DashboardHome';
import DiagnosticTab from '@/components/dashboard/tabs/DiagnosticTab';
import PlansTab from '@/components/dashboard/tabs/PlansTab';
import MyCulturesTab from '@/components/dashboard/tabs/MyCulturesTab';
import ClimateTab from '@/components/dashboard/tabs/ClimateTab';
import ReportsTab from '@/components/dashboard/tabs/ReportsTab';
import MobileNav from '@/components/dashboard/MobileNav';
//api
import getHarvests from '@/api/getHarvests';
import getUserData from '@/api/getUserData';

/* types */
import type { Crop, CultureForecast, UserData, Harvest } from '@/types';
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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [forecastsByCulture, setForecastsByCulture] = useState<CultureForecast>(
    forecastByCultureData
  );
  const [harvests, setHarvests] = useState<Harvest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResult: any = await getUserData();
        console.log('User data:', userResult);

        // userResult.data é um array, então pega o primeiro item
        const user = userResult.data?.[0];

        if (user) {
          setUserData(user); // Seta o primeiro usuário do array

          // Usa o user diretamente (não userData que ainda não foi setado)
          const harvestsResult = await getHarvests(user.id);
          console.log('Harvests data:', harvestsResult);
          setHarvests(harvestsResult.data);
        } else {
          console.error('Nenhum usuário encontrado na resposta');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        // toast.error('Erro ao carregar dados');
      }
    };

    fetchData();
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
            harvests={harvests}
            crops={crops}
            userData={userData}
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
        userData={userData}
      />
      {/* mobile nav */}
      <MobileNav
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        userData={userData}
      />
      <section className="overflow-x-hidden flex-1">{renderContent()}</section>
    </main>
  );
};

export default Dashboard;
