import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
import getUserById from '@/api/getUserById';
import deleteHarvest from '@/api/deleteHarvest';

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
        const userResult: any = await getUserById();
        // console.log('User data:', userResult);

        const user = userResult.data;

        if (user) {
          setUserData(user);

          const harvestsResult = await getHarvests();
          // console.log('Harvests data:', harvestsResult);
          setHarvests(harvestsResult.data);
        } else {
          console.error('Nenhum usuário encontrado na resposta');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const addCrop = (newCrop: Omit<Crop, 'id'>) => {
    const id = newCrop.name.toLowerCase().replace(/\s+/g, '-');
    setCrops([...crops, { ...newCrop, id }]);
  };

  const handleDeleteHarvest = async (id: number) => {
    const result = await deleteHarvest(id);

    if (result.success) {
      setHarvests(prev => prev.filter(h => h.id !== id));
      toast.success('Safra deletada com sucesso.');
    } else {
      // alert(result.message || 'Erro ao deletar safra.');
      toast.error(result.message || 'Erro ao deletar safra.');
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'culturas':
        return (
          <MyCulturesTab
            harvests={harvests}
            addCrop={addCrop}
            handleDeleteHarvest={handleDeleteHarvest}
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
          <ReportsTab harvests={harvests} setSelectedTab={setSelectedTab} />
        );
      case 'planos':
        return <PlansTab userData={userData} setUserData={setUserData} />;
      case 'dashboard':
      default:
        return (
          <DashboardHome
            harvests={harvests}
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
