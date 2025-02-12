import { useEffect, useState } from "react";
import { getAwsCost, getGcpCost } from "./api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [awsCost, setAwsCost] = useState([]);
  const [azureCost, setAzureCost] = useState([]);
  const [gcpCost, setGcpCost] = useState([]);
  const budgetLimit = 200;

  useEffect(() => {
    async function fetchData() {
      const awsData = await getAwsCost();
      const azureData = await getAzureCost();
      const gcpData = await getGcpCost();

      setAwsCost(
        awsData.map((item) => ({
          date: item.TimePeriod.Start,
          cost: parseFloat(item.Total.AmortizedCost.Amount),
        }))
      );

      setAzureCost(
        azureData.map((item) => ({
          date: item.date,
          cost: item.cost,
        }))
      );

      setGcpCost(
        gcpData.billing_accounts.map((item, index) => ({
          date: `Day ${index + 1}`,
          cost: Math.random() * 50, 
        }))
      );
    }
    fetchData();
  }, []);

  const totalAwsCost = awsCost.reduce((sum, entry) => sum + entry.cost, 0);
  const totalAzureCost = azureCost.reduce((sum, entry) => sum + entry.cost, 0);
  const totalGcpCost = gcpCost.reduce((sum, entry) => sum + entry.cost, 0);
  
  const awsProgress = Math.min((totalAwsCost / budgetLimit) * 100, 100);
  const azureProgress = Math.min((totalAzureCost / budgetLimit) * 100, 100);
  const gcpProgress = Math.min((totalGcpCost / budgetLimit) * 100, 100);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: "#FF9913", textShadow: "0px 0px 15px cyan" }}>
        ⚡ Cloud Cost Dashboard ⚡
      </h1>

      {/* Progress Bars */}
      <div className="row mb-4">
        <div className="col-md-4">
          <h5>AWS Cost: ${totalAwsCost.toFixed(2)} / ${budgetLimit}</h5>
          <div className="progress">
            <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${awsProgress}%` }}>
              {awsProgress.toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h5>Azure Cost: ${totalAzureCost.toFixed(2)} / ${budgetLimit}</h5>
          <div className="progress">
            <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${azureProgress}%` }}>
              {azureProgress.toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h5>GCP Cost: ${totalGcpCost.toFixed(2)} / ${budgetLimit}</h5>
          <div className="progress">
            <div className="progress-bar bg-success" role="progressbar" style={{ width: `${gcpProgress}%` }}>
              {gcpProgress.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown Tables */}
      <div className="row">
        <div className="col-md-4">
          <div className="cyber-card">
            <h3 className="text-center" style={{ color: "#ff00ff" }}>AWS Cost Breakdown</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Cost ($)</th>
                </tr>
              </thead>
              <tbody>
                {awsCost.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>${entry.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-4">
          <div className="cyber-card">
            <h3 className="text-center" style={{ color: "#00ff00" }}>Azure Cost Breakdown</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Cost ($)</th>
                </tr>
              </thead>
              <tbody>
                {azureCost.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>${entry.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-4">
          <div className="cyber-card">
            <h3 className="text-center" style={{ color: "#00ffff" }}>GCP Cost Breakdown</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Cost ($)</th>
                </tr>
              </thead>
              <tbody>
                {gcpCost.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>${entry.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cost Trend Line Chart */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="cyber-card">
            <h3 className="text-center" style={{ color: "#DFFE00" }}>Cost Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" data={awsCost} dataKey="cost" stroke="#00ffff" name="AWS Cost" />
                <Line type="monotone" data={azureCost} dataKey="cost" stroke="#00ff00" name="Azure Cost" />
                <Line type="monotone" data={gcpCost} dataKey="cost" stroke="#ff00ff" name="GCP Cost" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
