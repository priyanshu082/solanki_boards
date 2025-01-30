import { useState, useEffect } from 'react';
import { Card } from "@repo/ui/card";
import { useInView } from 'react-intersection-observer';
import { Building2, Users, Trophy, Globe, Target, Star } from 'lucide-react';

interface CountUpProps {
  end: number;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState<number>(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const startValue = 0;
      
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(startValue + (end - startValue) * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return <div ref={ref}>{count}</div>;
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label }) => (
  <div className=" flex flex-col items-center text-center justify-center gap-4 ">
        <Icon className="w-10 h-10 text-primary " />
    <div className=' bg-background '>
        <div className="text-xl flex flex-row items-center text-center  gap-2font-bold text-primary ">
      <CountUp end={value} />
        <span className='text-center '>+</span>
        </div>
    </div>
    <div className="text-primary font-bold text-sm">{label}</div>
  </div>
);

const StatsCounter: React.FC = () => {
  const stats = [
    { icon: Building2, value: 25, label: "Experience" },
    { icon: Users, value: 500, label: "Clients" },
    { icon: Trophy, value: 100, label: "Awards" },
    { icon: Globe, value: 30, label: "Countries" },
    { icon: Target, value: 1000, label: "Projects" },
    { icon: Star, value: 50, label: "Expert Team" }
  ];

  return (
        <Card className="container mx-auto px-2 py-4">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </Card>
  );
};

export default StatsCounter;