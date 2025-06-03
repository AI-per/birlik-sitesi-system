"use client";

import { useSettings } from "@/contexts/settings-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const defaultAvatars = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9439775.jpg-4JVJWOjPksd3DtnBYJXoWHA5lc1DU9.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
];

export default function SettingsPage() {
  const {
    settings,
    updateSettings,
    updateNotificationSettings,
    updatePrivacySettings,
  } = useSettings();
  const [selectedAvatar, setSelectedAvatar] = useState(settings.avatar);

  const handleSaveAccount = () => {
    updateSettings({
      avatar: selectedAvatar,
      fullName: settings.fullName,
      email: settings.email,
      phone: settings.phone,
      timezone: settings.timezone,
    });
    toast.success("Account settings saved successfully");
  };

  const handleSaveNotifications = () => {
    updateNotificationSettings(settings.notifications);
    toast.success("Notification settings saved successfully");
  };

  const handleSavePrivacy = () => {
    updatePrivacySettings(settings.privacy);
    toast.success("Privacy settings saved successfully");
  };

  return (
    <div className="container mx-auto py-10" data-oid="1qgen:k">
      <h1 className="text-3xl font-bold mb-6" data-oid="svwyroj">
        Settings
      </h1>
      <Tabs defaultValue="account" className="space-y-4" data-oid="zru8mcb">
        <TabsList className="grid w-full grid-cols-5" data-oid="p.kue11">
          <TabsTrigger value="account" data-oid="824vj:d">
            Account
          </TabsTrigger>
          <TabsTrigger value="security" data-oid="yzykop0">
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" data-oid="_qozh-0">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" data-oid="lr4ed1t">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" data-oid=":efms4f">
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" data-oid="g.f.rue">
          <Card data-oid=".gnoltr">
            <CardHeader data-oid="huna1ci">
              <CardTitle data-oid=":umqvql">Account Settings</CardTitle>
              <CardDescription data-oid="vl37:3a">
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" data-oid="cxzk8kc">
              <div className="space-y-4" data-oid="2scqwow">
                <Label data-oid="t7v.8ws">Current Avatar</Label>
                <div className="flex items-center space-x-4" data-oid="on6640:">
                  <Avatar className="h-20 w-20" data-oid="_ydw.xh">
                    <AvatarImage
                      src={selectedAvatar}
                      alt={settings.fullName}
                      data-oid="41xyz0:"
                    />

                    <AvatarFallback data-oid="kt_tao8">
                      {settings.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Label data-oid="nn.:akw">Choose a new avatar</Label>
                <div
                  className="flex gap-4 overflow-x-auto pb-2"
                  data-oid="v0ggay5"
                >
                  {defaultAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className={`h-20 w-20 rounded-lg cursor-pointer hover:ring-2 hover:ring-primary shrink-0 ${
                        selectedAvatar === avatar ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedAvatar(avatar)}
                      data-oid="udl_:t4"
                    >
                      <AvatarImage
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="object-cover"
                        data-oid="e6ha_:9"
                      />

                      <AvatarFallback data-oid="55i9y8l">
                        {index + 1}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div data-oid="k5jr4b7">
                  <Label htmlFor="custom-avatar" data-oid="f1t_0:7">
                    Or upload a custom avatar
                  </Label>
                  <Input
                    id="custom-avatar"
                    type="file"
                    accept="image/*"
                    className="mt-1"
                    data-oid="y2.fcfr"
                  />
                </div>
              </div>
              <div className="space-y-2" data-oid=":q0tec3">
                <Label htmlFor="full-name" data-oid="2vupjrl">
                  Full Name
                </Label>
                <Input
                  id="full-name"
                  value={settings.fullName}
                  onChange={(e) => updateSettings({ fullName: e.target.value })}
                  data-oid="1h44t37"
                />
              </div>
              <div className="space-y-2" data-oid="rz9zeh9">
                <Label htmlFor="email" data-oid="8x0ajsa">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSettings({ email: e.target.value })}
                  data-oid="wl5:44r"
                />
              </div>
              <div className="space-y-2" data-oid="a.wx:12">
                <Label htmlFor="phone" data-oid="9kj:yzf">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => updateSettings({ phone: e.target.value })}
                  data-oid="b4ra-ex"
                />
              </div>
              <div className="space-y-2" data-oid="cvj5_x.">
                <Label htmlFor="timezone" data-oid="qr4coh0">
                  Timezone
                </Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => updateSettings({ timezone: value })}
                  data-oid="k4u.sc3"
                >
                  <SelectTrigger id="timezone" data-oid="usmgn3v">
                    <SelectValue
                      placeholder="Select Timezone"
                      data-oid="zz4iyh."
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="dh0zkej">
                    <SelectItem value="utc-12" data-oid="dvpxvg6">
                      International Date Line West (UTC-12)
                    </SelectItem>
                    <SelectItem value="utc-11" data-oid="ut1pwif">
                      Samoa Standard Time (UTC-11)
                    </SelectItem>
                    <SelectItem value="utc-10" data-oid="_s0v244">
                      Hawaii-Aleutian Standard Time (UTC-10)
                    </SelectItem>
                    <SelectItem value="utc-9" data-oid="tu:_yps">
                      Alaska Standard Time (UTC-9)
                    </SelectItem>
                    <SelectItem value="utc-8" data-oid="m4hg5z.">
                      Pacific Time (UTC-8)
                    </SelectItem>
                    <SelectItem value="utc-7" data-oid="cpt46.t">
                      Mountain Time (UTC-7)
                    </SelectItem>
                    <SelectItem value="utc-6" data-oid="et3k3t6">
                      Central Time (UTC-6)
                    </SelectItem>
                    <SelectItem value="utc-5" data-oid="4aeyz6j">
                      Eastern Time (UTC-5)
                    </SelectItem>
                    <SelectItem value="utc-4" data-oid="jpq.:ri">
                      Atlantic Time (UTC-4)
                    </SelectItem>
                    <SelectItem value="utc-3" data-oid="z3e:ps0">
                      Argentina Standard Time (UTC-3)
                    </SelectItem>
                    <SelectItem value="utc-2" data-oid="xaujjxk">
                      South Georgia Time (UTC-2)
                    </SelectItem>
                    <SelectItem value="utc-1" data-oid="f.bae40">
                      Azores Time (UTC-1)
                    </SelectItem>
                    <SelectItem value="utc+0" data-oid="6.010b-">
                      Greenwich Mean Time (UTC+0)
                    </SelectItem>
                    <SelectItem value="utc+1" data-oid="vmajbkj">
                      Central European Time (UTC+1)
                    </SelectItem>
                    <SelectItem value="utc+2" data-oid="pqm2unq">
                      Eastern European Time (UTC+2)
                    </SelectItem>
                    <SelectItem value="utc+3" data-oid="l4lea.p">
                      Moscow Time (UTC+3)
                    </SelectItem>
                    <SelectItem value="utc+4" data-oid="20o-ac8">
                      Gulf Standard Time (UTC+4)
                    </SelectItem>
                    <SelectItem value="utc+5" data-oid="b-ojx1k">
                      Pakistan Standard Time (UTC+5)
                    </SelectItem>
                    <SelectItem value="utc+5.5" data-oid="t8.59vr">
                      Indian Standard Time (UTC+5:30)
                    </SelectItem>
                    <SelectItem value="utc+6" data-oid="q-x4f9t">
                      Bangladesh Standard Time (UTC+6)
                    </SelectItem>
                    <SelectItem value="utc+7" data-oid="l.afv:0">
                      Indochina Time (UTC+7)
                    </SelectItem>
                    <SelectItem value="utc+8" data-oid="2z9-r.0">
                      China Standard Time (UTC+8)
                    </SelectItem>
                    <SelectItem value="utc+9" data-oid="pv6jeyi">
                      Japan Standard Time (UTC+9)
                    </SelectItem>
                    <SelectItem value="utc+10" data-oid="iep9j6m">
                      Australian Eastern Standard Time (UTC+10)
                    </SelectItem>
                    <SelectItem value="utc+11" data-oid="kd3c-bg">
                      Solomon Islands Time (UTC+11)
                    </SelectItem>
                    <SelectItem value="utc+12" data-oid="p_7vag7">
                      New Zealand Standard Time (UTC+12)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter data-oid="a55l5mu">
              <Button onClick={handleSaveAccount} data-oid="5gk9hsw">
                Save Account Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" data-oid="6ho2u.x">
          <div className="grid gap-4 md:grid-cols-2" data-oid="94gen0k">
            <Card className="md:col-span-2" data-oid="tsgr8_x">
              <CardHeader data-oid="q7.a.td">
                <CardTitle data-oid="fcj1hl7">Security Settings</CardTitle>
                <CardDescription data-oid="_zuxwfq">
                  Manage your account's security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="bd.z50f">
                <div className="space-y-2" data-oid="gks3a9f">
                  <Label htmlFor="current-password" data-oid="-biu.w2">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    data-oid="n5_dg_9"
                  />
                </div>
                <div className="space-y-2" data-oid="azuqvhp">
                  <Label htmlFor="new-password" data-oid="vekjb8k">
                    New Password
                  </Label>
                  <Input id="new-password" type="password" data-oid="acp8fvg" />
                </div>
                <div className="space-y-2" data-oid="438dzs9">
                  <Label htmlFor="confirm-password" data-oid="pa--_oe">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    data-oid="por6pee"
                  />
                </div>
                <div className="flex items-center space-x-2" data-oid="gyttpqa">
                  <Switch id="two-factor" data-oid="x6ibj:y" />
                  <Label htmlFor="two-factor" data-oid="u_4d26h">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
              </CardContent>
              <CardFooter data-oid="74p:uax">
                <Button data-oid="pm8vn49">Save Security Settings</Button>
              </CardFooter>
            </Card>

            <Card data-oid="5kyq6bk">
              <CardHeader data-oid="vbk1qut">
                <CardTitle data-oid="ae.sef-">Login History</CardTitle>
                <CardDescription data-oid="rk7enuh">
                  Recent login activities on your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-oid=".hwn_r8">
                {[
                  {
                    date: "2023-07-20",
                    time: "14:30 UTC",
                    ip: "192.168.1.1",
                    location: "New York, USA",
                  },
                  {
                    date: "2023-07-19",
                    time: "09:15 UTC",
                    ip: "10.0.0.1",
                    location: "London, UK",
                  },
                  {
                    date: "2023-07-18",
                    time: "22:45 UTC",
                    ip: "172.16.0.1",
                    location: "Tokyo, Japan",
                  },
                ].map((login, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                    data-oid="y.ze:te"
                  >
                    <span data-oid="ty2aqdc">
                      {login.date} {login.time}
                    </span>
                    <span data-oid="amv:eu4">{login.ip}</span>
                    <span data-oid="it1pgbu">{login.location}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="i-dmja8">
              <CardHeader data-oid="55net4w">
                <CardTitle data-oid="3ym8u1:">Active Sessions</CardTitle>
                <CardDescription data-oid=".g.y3rq">
                  Currently active sessions on your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="rkri-89">
                {[
                  {
                    device: "Laptop",
                    browser: "Chrome",
                    os: "Windows 10",
                    icon: Laptop,
                  },
                  {
                    device: "Smartphone",
                    browser: "Safari",
                    os: "iOS 15",
                    icon: Smartphone,
                  },
                  {
                    device: "Tablet",
                    browser: "Firefox",
                    os: "Android 12",
                    icon: Tablet,
                  },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                    data-oid="dwdk_0-"
                  >
                    <span className="flex items-center" data-oid="rza9ex3">
                      <session.icon
                        className="mr-2 h-4 w-4"
                        data-oid="xrrsgnc"
                      />

                      {session.device}
                    </span>
                    <span data-oid="8r4y::z">{session.browser}</span>
                    <span data-oid="xiy6_cw">{session.os}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter data-oid="nlf7j:_">
                <Button variant="outline" data-oid="jwatwxe">
                  Log Out All Other Sessions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" data-oid="3zuiwfm">
          <Card data-oid="cs8km1o">
            <CardHeader data-oid="f-kyb8w">
              <CardTitle data-oid="8t:vcu0">Preferences</CardTitle>
              <CardDescription data-oid="-7pglln">
                Customize your dashboard experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="41rxiy:">
              <div className="grid gap-4 md:grid-cols-2" data-oid="v65ojqj">
                <div className="space-y-2" data-oid="fokms9g">
                  <Label htmlFor="language" data-oid="czjuzol">
                    Language
                  </Label>
                  <Select defaultValue="en" data-oid="78541xt">
                    <SelectTrigger id="language" data-oid="iw9ejqb">
                      <SelectValue
                        placeholder="Select Language"
                        data-oid="sq.xnv9"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="qi66cfm">
                      <SelectItem value="en" data-oid="ynw213s">
                        English
                      </SelectItem>
                      <SelectItem value="es" data-oid="t:kxtbw">
                        Español
                      </SelectItem>
                      <SelectItem value="fr" data-oid="4q12il1">
                        Français
                      </SelectItem>
                      <SelectItem value="de" data-oid=".n7zgkn">
                        Deutsch
                      </SelectItem>
                      <SelectItem value="zh" data-oid="j5nnzst">
                        中文
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-oid="q3p63-9">
                  <Label htmlFor="currency" data-oid="uvppzuo">
                    Currency
                  </Label>
                  <Select defaultValue="usd" data-oid="-0lztr-">
                    <SelectTrigger id="currency" data-oid="tna10.9">
                      <SelectValue
                        placeholder="Select Currency"
                        data-oid="6tk7bxg"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="egdh9r.">
                      <SelectItem value="usd" data-oid="4imfhqe">
                        USD ($)
                      </SelectItem>
                      <SelectItem value="eur" data-oid="wg6d.ox">
                        EUR (€)
                      </SelectItem>
                      <SelectItem value="gbp" data-oid="_jgsrii">
                        GBP (£)
                      </SelectItem>
                      <SelectItem value="jpy" data-oid="716.og3">
                        JPY (¥)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-oid="aimxug_">
                  <Label htmlFor="date-format" data-oid="xfvmrnl">
                    Date Format
                  </Label>
                  <Select defaultValue="mm-dd-yyyy" data-oid="45xjt5x">
                    <SelectTrigger id="date-format" data-oid="3q.9sjb">
                      <SelectValue
                        placeholder="Select Date Format"
                        data-oid="_wkio8u"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="8towkny">
                      <SelectItem value="mm-dd-yyyy" data-oid="4t7.2se">
                        MM-DD-YYYY
                      </SelectItem>
                      <SelectItem value="dd-mm-yyyy" data-oid="s0vhyen">
                        DD-MM-YYYY
                      </SelectItem>
                      <SelectItem value="yyyy-mm-dd" data-oid="bxu-bde">
                        YYYY-MM-DD
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-oid=":0r7396">
                  <Label htmlFor="font-size" data-oid="iz_amp5">
                    Font Size
                  </Label>
                  <Slider
                    defaultValue={[16]}
                    max={24}
                    min={12}
                    step={1}
                    data-oid="rtt6dux"
                  />
                </div>
              </div>
              <div className="space-y-2" data-oid="5-1902s">
                <Label data-oid="einv9g8">Theme</Label>
                <RadioGroup defaultValue="system" data-oid="rgxb2ge">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="p6w880p"
                  >
                    <RadioGroupItem
                      value="light"
                      id="theme-light"
                      data-oid="2pn:6o4"
                    />

                    <Label htmlFor="theme-light" data-oid="lmyhp3a">
                      Light
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="nnif_m0"
                  >
                    <RadioGroupItem
                      value="dark"
                      id="theme-dark"
                      data-oid="3hsx17_"
                    />

                    <Label htmlFor="theme-dark" data-oid="1ou9a04">
                      Dark
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="y78ba3g"
                  >
                    <RadioGroupItem
                      value="system"
                      id="theme-system"
                      data-oid="1oqz0cd"
                    />

                    <Label htmlFor="theme-system" data-oid="cm5hz9d">
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2" data-oid="ooid.uf">
                <Label data-oid="geoey_x">Dashboard Layout</Label>
                <RadioGroup defaultValue="default" data-oid="tmxl8v_">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="h.jzggk"
                  >
                    <RadioGroupItem
                      value="default"
                      id="layout-default"
                      data-oid="mf-z46r"
                    />

                    <Label htmlFor="layout-default" data-oid="rzo7b95">
                      Default
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="a0fu_t-"
                  >
                    <RadioGroupItem
                      value="compact"
                      id="layout-compact"
                      data-oid="0q.qwc5"
                    />

                    <Label htmlFor="layout-compact" data-oid="ft9d5eg">
                      Compact
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="4xwutd_"
                  >
                    <RadioGroupItem
                      value="expanded"
                      id="layout-expanded"
                      data-oid="7ac:9nu"
                    />

                    <Label htmlFor="layout-expanded" data-oid="1pm.enn">
                      Expanded
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter data-oid="jq8ovoc">
              <Button data-oid="ldi1znh">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" data-oid="luk.0il">
          <Card data-oid="9zz9e50">
            <CardHeader data-oid="k5xjvms">
              <CardTitle data-oid="vfo_ooo">Notification Settings</CardTitle>
              <CardDescription data-oid="_powo5t">
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="qu_wk3t">
              <div className="grid gap-4 md:grid-cols-2" data-oid="z7x7y0k">
                <div className="space-y-2" data-oid="j1e7il.">
                  <Label data-oid="8e1syor">Notification Channels</Label>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="zygii8g"
                  >
                    <Checkbox
                      id="email-notifications"
                      defaultChecked={settings.notifications.email}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          email: e.target.checked,
                        })
                      }
                      data-oid="qdqs:jp"
                    />

                    <Label htmlFor="email-notifications" data-oid="-o1hrzs">
                      Email Notifications
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="o000p.o"
                  >
                    <Checkbox
                      id="push-notifications"
                      defaultChecked={settings.notifications.push}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          push: e.target.checked,
                        })
                      }
                      data-oid="gn_zcon"
                    />

                    <Label htmlFor="push-notifications" data-oid="m2kog6j">
                      Push Notifications
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="z4znmky"
                  >
                    <Checkbox
                      id="sms-notifications"
                      defaultChecked={settings.notifications.sms}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          sms: e.target.checked,
                        })
                      }
                      data-oid="68yifr7"
                    />

                    <Label htmlFor="sms-notifications" data-oid="f46k589">
                      SMS Notifications
                    </Label>
                  </div>
                </div>
                <div className="space-y-2" data-oid="xgn65tm">
                  <Label data-oid="783khpi">Notification Types</Label>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="rz1r3ru"
                  >
                    <Checkbox
                      id="account-activity"
                      defaultChecked={settings.notifications.accountActivity}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          accountActivity: e.target.checked,
                        })
                      }
                      data-oid="ykuru.r"
                    />

                    <Label htmlFor="account-activity" data-oid="8s0duhz">
                      Account Activity
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="gv-pdjm"
                  >
                    <Checkbox
                      id="new-features"
                      defaultChecked={settings.notifications.newFeatures}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          newFeatures: e.target.checked,
                        })
                      }
                      data-oid="k4d..m0"
                    />

                    <Label htmlFor="new-features" data-oid="gvox89x">
                      New Features and Updates
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="rrivx47"
                  >
                    <Checkbox
                      id="marketing"
                      defaultChecked={settings.notifications.marketing}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          marketing: e.target.checked,
                        })
                      }
                      data-oid="ydeb-20"
                    />

                    <Label htmlFor="marketing" data-oid="lnc4.di">
                      Marketing and Promotions
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2" data-oid="g9932f2">
                <Label htmlFor="notification-frequency" data-oid="llkz6sh">
                  Notification Frequency
                </Label>
                <Select
                  value={settings.notifications.frequency}
                  onValueChange={(value) =>
                    updateNotificationSettings({
                      ...settings.notifications,
                      frequency: value,
                    })
                  }
                  data-oid="s.53760"
                >
                  <SelectTrigger id="notification-frequency" data-oid="btl2oiq">
                    <SelectValue
                      placeholder="Select Frequency"
                      data-oid="44a5kz2"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="q_e.b.4">
                    <SelectItem value="real-time" data-oid="3f0:z9b">
                      Real-time
                    </SelectItem>
                    <SelectItem value="daily" data-oid="qq4cufm">
                      Daily Digest
                    </SelectItem>
                    <SelectItem value="weekly" data-oid="o63zegu">
                      Weekly Summary
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2" data-oid="hmdoljz">
                <Label htmlFor="quiet-hours-start" data-oid="91livwg">
                  Quiet Hours
                </Label>
                <div className="flex items-center space-x-2" data-oid="mp5xiix">
                  <Input
                    id="quiet-hours-start"
                    type="time"
                    defaultValue="22:00"
                    data-oid="o.6viih"
                  />

                  <span data-oid="mf4hkgs">to</span>
                  <Input
                    id="quiet-hours-end"
                    type="time"
                    defaultValue="07:00"
                    data-oid="53q-2ga"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter data-oid="ie603l4">
              <Button onClick={handleSaveNotifications} data-oid=".f45hsw">
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" data-oid="yafqm3o">
          <Card data-oid="jhl9uim">
            <CardHeader data-oid="jso.bk9">
              <CardTitle data-oid="pvcj2m:">Privacy Settings</CardTitle>
              <CardDescription data-oid="v6n:t.k">
                Manage your privacy and data settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" data-oid="l3wy7:n">
              <div className="grid gap-4 md:grid-cols-2" data-oid="n00k.65">
                <Card data-oid="hjtfbee">
                  <CardHeader data-oid="ly0e99u">
                    <CardTitle className="text-lg" data-oid="mv8utk6">
                      Data Sharing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2" data-oid="p:-f2w3">
                    <div
                      className="flex items-center justify-between"
                      data-oid="la55zs8"
                    >
                      <Label htmlFor="analytics-sharing" data-oid="zf4a5t2">
                        Share analytics data
                      </Label>
                      <Switch
                        id="analytics-sharing"
                        checked={settings.privacy.analyticsSharing}
                        onChange={(e) =>
                          updatePrivacySettings({
                            ...settings.privacy,
                            analyticsSharing: e.target.checked,
                          })
                        }
                        data-oid="15pxr0a"
                      />
                    </div>
                    <div
                      className="flex items-center justify-between"
                      data-oid="k6azzxf"
                    >
                      <Label htmlFor="personalized-ads" data-oid="4sx-two">
                        Allow personalized ads
                      </Label>
                      <Switch
                        id="personalized-ads"
                        checked={settings.privacy.personalizedAds}
                        onChange={(e) =>
                          updatePrivacySettings({
                            ...settings.privacy,
                            personalizedAds: e.target.checked,
                          })
                        }
                        data-oid="ncprtlk"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card data-oid="2ofaucj">
                  <CardHeader data-oid="0fd6ql.">
                    <CardTitle className="text-lg" data-oid="6c_7_ta">
                      Account Visibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="4en0l4j">
                    <RadioGroup
                      value={settings.privacy.visibility}
                      onValueChange={(value) =>
                        updatePrivacySettings({
                          ...settings.privacy,
                          visibility: value,
                        })
                      }
                      data-oid="6htn.2j"
                    >
                      <div
                        className="flex items-center space-x-2"
                        data-oid="-7obj60"
                      >
                        <RadioGroupItem
                          value="public"
                          id="visibility-public"
                          data-oid="eq.tfrv"
                        />

                        <Label htmlFor="visibility-public" data-oid="hf_82w8">
                          Public
                        </Label>
                      </div>
                      <div
                        className="flex items-center space-x-2"
                        data-oid="u7fydb4"
                      >
                        <RadioGroupItem
                          value="private"
                          id="visibility-private"
                          data-oid="tr6._sd"
                        />

                        <Label htmlFor="visibility-private" data-oid="y8tt6e4">
                          Private
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2" data-oid="9plk-.c">
                <Card data-oid="908s2.g">
                  <CardHeader data-oid="dmabz8m">
                    <CardTitle className="text-lg" data-oid="9od3gt8">
                      Data Retention
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="znzjlp4">
                    <Select
                      value={settings.privacy.dataRetention}
                      onValueChange={(value) =>
                        updatePrivacySettings({
                          ...settings.privacy,
                          dataRetention: value,
                        })
                      }
                      data-oid="900kiep"
                    >
                      <SelectTrigger id="data-retention" data-oid="-w7:bb4">
                        <SelectValue
                          placeholder="Select Data Retention Period"
                          data-oid="j-m.mu9"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="m-gi2zu">
                        <SelectItem value="6-months" data-oid="9.qqkfa">
                          6 Months
                        </SelectItem>
                        <SelectItem value="1-year" data-oid="q04y-74">
                          1 Year
                        </SelectItem>
                        <SelectItem value="2-years" data-oid="zbmtstr">
                          2 Years
                        </SelectItem>
                        <SelectItem value="indefinite" data-oid="nx3wipx">
                          Indefinite
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
                <Card data-oid="gg12vxv">
                  <CardHeader data-oid="pl5a9jo">
                    <CardTitle className="text-lg" data-oid="4jns_u9">
                      Third-Party Integrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2" data-oid="z39h:lz">
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="fvxzo1d"
                    >
                      Connected: Google Analytics, Facebook Pixel
                    </p>
                    <Button variant="outline" data-oid="zi8asdh">
                      Manage Integrations
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-between" data-oid="pxe61mt">
                <Button variant="outline" data-oid="up.sbbc">
                  Download Your Data
                </Button>
                <Button variant="destructive" data-oid="p5o:vwi">
                  Delete My Account
                </Button>
              </div>
            </CardContent>
            <CardFooter data-oid="0ubtf43">
              <Button onClick={handleSavePrivacy} data-oid="_agi:gk">
                Save Privacy Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
