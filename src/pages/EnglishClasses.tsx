
import React from "react";
import { Link } from "react-router-dom";
import { Globe, MapPin, GraduationCap, MessageSquare, Users, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EnglishClasses = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">English Classes</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            English Classes in Bogotá, Colombia
          </h1>
          <p className="text-lg text-muted-foreground">
            Professional English language instruction tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-trippy-gradient-3 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Fluent Communication
              </CardTitle>
              <CardDescription className="text-white/80">
                Develop practical language skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our classes focus on developing real-world communication skills that you can use in professional and social contexts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-trippy-gradient-1 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Small Groups & Private
              </CardTitle>
              <CardDescription className="text-white/80">
                Personalized attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Choose between small group classes (max 4 students) or private one-on-one lessons customized to your specific goals.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-trippy-gradient-2 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Convenient Location
              </CardTitle>
              <CardDescription className="text-white/80">
                Central Bogotá
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our classes are held in a comfortable, accessible location in the heart of Bogotá with options for online learning as well.
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Beginner English
                  </CardTitle>
                  <CardDescription>For those just starting their English journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Basic vocabulary and phrases</li>
                    <li>Essential grammar structures</li>
                    <li>Simple conversation practice</li>
                    <li>Listening and pronunciation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Intermediate English
                  </CardTitle>
                  <CardDescription>For those with basic knowledge looking to improve</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Expanded vocabulary</li>
                    <li>More complex grammar</li>
                    <li>Fluent conversation practice</li>
                    <li>Reading comprehension</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Advanced English
                  </CardTitle>
                  <CardDescription>For those wanting to perfect their skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Nuanced expressions and idioms</li>
                    <li>Advanced grammar mastery</li>
                    <li>Debate and presentation skills</li>
                    <li>Writing for academic/business purposes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Business English
                  </CardTitle>
                  <CardDescription>Specialized courses for professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Professional vocabulary</li>
                    <li>Email and report writing</li>
                    <li>Meeting and negotiation skills</li>
                    <li>Presentation techniques</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="schedule" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Class Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Morning Sessions</h3>
                      <ul className="space-y-1">
                        <li>Monday - Friday: 7:00 AM - 9:00 AM</li>
                        <li>Saturday: 9:00 AM - 12:00 PM</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Afternoon Sessions</h3>
                      <ul className="space-y-1">
                        <li>Monday - Friday: 2:00 PM - 4:00 PM</li>
                        <li>Saturday: 2:00 PM - 5:00 PM</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Evening Sessions</h3>
                      <ul className="space-y-1">
                        <li>Monday - Friday: 6:00 PM - 8:00 PM</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Online Sessions</h3>
                      <ul className="space-y-1">
                        <li>Flexible scheduling available</li>
                        <li>Customized to your time zone</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      * Private classes can be scheduled at your convenience, subject to instructor availability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pricing" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Group Classes</CardTitle>
                  <CardDescription>2-4 students per group</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Single Class (2 hours)</span>
                      <span className="font-medium">$30 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10 Class Package</span>
                      <span className="font-medium">$250 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly (3x per week)</span>
                      <span className="font-medium">$320 USD</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Private Classes</CardTitle>
                  <CardDescription>One-on-one personalized instruction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Single Class (1 hour)</span>
                      <span className="font-medium">$40 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10 Class Package</span>
                      <span className="font-medium">$350 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly (3x per week)</span>
                      <span className="font-medium">$450 USD</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Book Private Class</Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li>All materials are included in the price</li>
                  <li>Payment can be made in Colombian Pesos at the current exchange rate</li>
                  <li>Special discounts available for students and corporate groups</li>
                  <li>Trial class available at a reduced rate of $15 USD</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Contact for Special Rates</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ready to improve your English?</CardTitle>
            <CardDescription>
              Contact us today to schedule a free assessment and start your language journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Contact Details</h3>
                <ul className="space-y-1">
                  <li>Email: english.bogota@example.com</li>
                  <li>Phone: +57 300 123 4567</li>
                  <li>WhatsApp: +57 300 123 4567</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Location</h3>
                <p>Carrera 7 #71-21, Office 802<br />Bogotá, Colombia</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Schedule Your Free Assessment</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EnglishClasses;
