import { useState } from "react";
import Input from "../components/Input";
import Card from "../components/Card";

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        name: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const register = async () => {
        try {
            // const response = await fetch("http://localhost:4000/auth/signup", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(formData),
            // });
            // const data = await response.json();
            console.log(formData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center min-h-screen">
            <Card>
                <div className="flex flex-col">
                    <div className="text-center font-bold text-2xl p-4">Authentication</div>
                    <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                    <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <button
                        className="border-2 bg-gray-700 text-white font-semibold px-4 py-2"
                        onClick={register}
                        type="submit">
                        Signup
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Signup;