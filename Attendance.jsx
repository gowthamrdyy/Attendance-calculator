import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AttendanceCalculator() {
  const [totalClasses, setTotalClasses] = useState(0);
  const [attendedClasses, setAttendedClasses] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(null);

  const calculateAttendance = () => {
    if (totalClasses > 0) {
      const percentage = ((attendedClasses / totalClasses) * 100).toFixed(2);
      setAttendancePercentage(percentage);
    }
  };

  return (
    <motion.div className="flex flex-col items-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold mb-4">Attendance Calculator</h1>
      <Card className="w-full max-w-md p-4">
        <CardContent className="flex flex-col gap-4">
          <Input type="number" placeholder="Total Classes" onChange={(e) => setTotalClasses(Number(e.target.value))} />
          <Input type="number" placeholder="Attended Classes" onChange={(e) => setAttendedClasses(Number(e.target.value))} />
          <Button onClick={calculateAttendance}>Calculate</Button>
          {attendancePercentage !== null && (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-xl font-semibold mt-4">
              Attendance: {attendancePercentage}%
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
