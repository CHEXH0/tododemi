import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    country: "",
    languages: "",
    hobbies: "",
    dreams: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast("Information saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Your age"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Your country"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="languages">Languages</Label>
        <Input
          id="languages"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          placeholder="Languages you speak"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hobbies">Hobbies</Label>
        <Textarea
          id="hobbies"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          placeholder="Tell us about your hobbies"
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dreams">Dreams and Goals</Label>
        <Textarea
          id="dreams"
          name="dreams"
          value={formData.dreams}
          onChange={handleChange}
          placeholder="Share your dreams and goals"
          className="min-h-[100px]"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Save Information
      </Button>
    </form>
  );
};