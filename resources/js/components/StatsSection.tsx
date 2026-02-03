import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const StatsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // State for counters
  const [countStudents, setCountStudents] = useState(0);
  const [countTeachers, setCountTeachers] = useState(0);
  const [countGraduates, setCountGraduates] = useState(0);
  const [countPartners, setCountPartners] = useState(0);
  
  // Animation duration in ms
  const animationDuration = 2000;
  
  // Target values for counters
  const targetStudents = 350;
  const targetTeachers = 28;
  const targetGraduates = 150;
  const targetPartners = 12;
  
  // Start animation when section comes into view
  useEffect(() => {
    if (isInView) {
      const studentsInterval = setInterval(() => {
        setCountStudents(prev => {
          const newValue = prev + Math.ceil(targetStudents / (animationDuration / 50));
          return newValue >= targetStudents ? targetStudents : newValue;
        });
      }, 50);
      
      const teachersInterval = setInterval(() => {
        setCountTeachers(prev => {
          const newValue = prev + Math.ceil(targetTeachers / (animationDuration / 50));
          return newValue >= targetTeachers ? targetTeachers : newValue;
        });
      }, 50);
      
      const graduatesInterval = setInterval(() => {
        setCountGraduates(prev => {
          const newValue = prev + Math.ceil(targetGraduates / (animationDuration / 50));
          return newValue >= targetGraduates ? targetGraduates : newValue;
        });
      }, 50);
      
      const partnersInterval = setInterval(() => {
        setCountPartners(prev => {
          const newValue = prev + Math.ceil(targetPartners / (animationDuration / 50));
          return newValue >= targetPartners ? targetPartners : newValue;
        });
      }, 50);
      
      // Clear intervals when animation is complete
      setTimeout(() => {
        clearInterval(studentsInterval);
        clearInterval(teachersInterval);
        clearInterval(graduatesInterval);
        clearInterval(partnersInterval);
        
        // Ensure final values are set
        setCountStudents(targetStudents);
        setCountTeachers(targetTeachers);
        setCountGraduates(targetGraduates);
        setCountPartners(targetPartners);
      }, animationDuration);
      
      // Clean up intervals on unmount
      return () => {
        clearInterval(studentsInterval);
        clearInterval(teachersInterval);
        clearInterval(graduatesInterval);
        clearInterval(partnersInterval);
      };
    }
  }, [isInView]);

  return (
    <section className="py-24 relative overflow-hidden bg-black/90" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10" />
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent" />
      
      {/* Glowing elements */}
      <div className="absolute left 1/3 top-0 w-[300px] h-[300px] bg-orange-500/20 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
          <StatCard 
            count={countStudents} 
            label="Siswa Aktif" 
            delay={0} 
            isInView={isInView} 
          />
          <StatCard 
            count={countTeachers} 
            label="Tenaga Pengajar" 
            delay={0.1}
            isInView={isInView}
          />
          <StatCard 
            count={countGraduates} 
            label="Alumni Sukses" 
            delay={0.2}
            isInView={isInView}
          />
          <StatCard 
            count={countPartners} 
            label="Mitra Industri" 
            delay={0.3}
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  count: number;
  label: string;
  delay: number;
  isInView: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ count, label, delay, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="bg-gradient-to-br from-white/10 to-white/[0.01] backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8 text-center"
    >
      <div className="flex items-end justify-center">
        <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">{count}+</span>
      </div>
      <div className="mt-2 text-white/70">{label}</div>
      
      {/* Decorative line */}
      <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto mt-4" />
    </motion.div>
  );
};

export default StatsSection; 