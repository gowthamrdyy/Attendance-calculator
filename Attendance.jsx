import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function AttendanceCalculator() {
  const [totalClasses, setTotalClasses] = useState(0);
  const [attendedClasses, setAttendedClasses] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [bunkableClasses, setBunkableClasses] = useState(null);

  const calculateAttendance = () => {
    if (totalClasses > 0) {
      const percentage = ((attendedClasses / totalClasses) * 100).toFixed(2);
      setAttendancePercentage(percentage);
      predictMinimumClasses(percentage);
      calculateBunkableClasses(percentage);
    }
  };

  const predictMinimumClasses = (currentPercentage) => {
    let requiredClasses = 0;
    let tempAttended = attendedClasses;
    let tempTotal = totalClasses;
    while ((tempAttended / tempTotal) * 100 < 75) {
      tempTotal++;
      tempAttended++;
      requiredClasses++;
    }
    setPrediction(requiredClasses);
  };

  const calculateBunkableClasses = (currentPercentage) => {
    let bunkable = 0;
    let tempAttended = attendedClasses;
    let tempTotal = totalClasses;
    while ((tempAttended / tempTotal) * 100 > 75) {
      tempTotal++;
      bunkable++;
    }
    setBunkableClasses(bunkable - 1);
  };

  return (
    <motion.div 
      className="flex flex-col items-center p-6" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}>
      <h1 className="text-4xl font-bold mb-6 text-gradient">📊 Attendance Calculator</h1>
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-xl bg-white">
        <CardContent className="flex flex-col gap-5">
          <Input 
            type="number" 
            placeholder="Total Classes" 
            value={totalClasses} 
            onChange={(e) => setTotalClasses(Number(e.target.value))} 
          />
          <Input 
            type="number" 
            placeholder="Attended Classes" 
            value={attendedClasses} 
            onChange={(e) => setAttendedClasses(Number(e.target.value))} 
          />
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold" onClick={calculateAttendance}>
            Calculate 📈
          </Button>
          {attendancePercentage !== null && (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <p className="text-xl font-semibold text-center">📉 Attendance: {attendancePercentage}%</p>
              <Progress value={attendancePercentage} className="mt-2 h-3" />
              {prediction > 0 && (
                <p className="text-red-500 mt-4 text-center">⚠️ You need to attend {prediction} more classes to reach 75%!</p>
              )}
              {bunkableClasses > 0 && (
                <p className="text-green-500 mt-4 text-center">🎉 You can bunk {bunkableClasses} classes and still maintain 75% attendance!</p>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
