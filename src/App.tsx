import Hardware from "./components/hardware/Hardware";
import Room from "./components/room/Room";
import Schedule from "./components/schedule/Schedule";

const App = () => {
  return (
    <div className="p-8">
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-center pt-12">
          <p className="text-2xl font-bold">Schedulock Hardware Integration</p>
        </div>
        <div>
          <Room />
        </div>
        <div>
          <Schedule />
        </div>

        <div>
          <Hardware />
        </div>
      </div>
    </div>
  );
};

export default App;
