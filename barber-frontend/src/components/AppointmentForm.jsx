import { useEffect } from "react";
import { getAvailableBarbers } from "../services/barbers"; // nova função

const [barbers, setBarbers] = useState([]);
const [formData, setFormData] = useState({
    barber_email: "",
    service: "",
    date: "",
    time: "",
});

useEffect(() => {
    async function fetchBarbers() {
        const data = await getAvailableBarbers();
        setBarbers(data);
    }
    fetchBarbers();
}, []);

<label>
    Barbeiro
    <select
        name="barber_email"
        value={formData.barber_email}
        onChange={handleChange}
        required
    >
        <option value="">Selecione</option>
        {barbers.map((barber) => (
            <option key={barber.email} value={barber.email}>
                {barber.name}
            </option>
        ))}
    </select>
</label>