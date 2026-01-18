"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ShadcnPlaygroundPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-text-main mb-3">
            shadcn/ui Components
          </h1>
          <p className="text-lg text-text-body">
            Components themed with Metrosure brand colours
          </p>
          <div className="mt-4 flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Primary: #BF0603
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
              Secondary: #690025
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
              Accent: #EFF2A0
            </span>
          </div>
        </motion.div>

        <div className="space-y-12">
          {/* Buttons Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-card rounded-2xl border border-border-light p-8"
          >
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-6">
              Buttons
            </h2>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <span className="material-symbols-outlined text-lg">add</span>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button disabled>Disabled</Button>
                <Button onClick={() => toast.success("Action completed!")}>
                  Show Toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.error("Something went wrong")}
                >
                  Error Toast
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    toast.info("Here is some information", {
                      description: "This is a description for the toast",
                    })
                  }
                >
                  Info Toast
                </Button>
              </div>
            </div>
          </motion.section>

          {/* Form Inputs Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-card rounded-2xl border border-border-light p-8"
          >
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-6">
              Form Inputs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">
                  Input
                </label>
                <Input type="text" placeholder="Enter your name..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">
                  Email Input
                </label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">
                  Disabled Input
                </label>
                <Input disabled placeholder="This is disabled" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">
                  Select
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto Insurance</SelectItem>
                    <SelectItem value="home">Home Insurance</SelectItem>
                    <SelectItem value="life">Life Insurance</SelectItem>
                    <SelectItem value="business">Business Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-text-main">
                  Textarea
                </label>
                <Textarea
                  placeholder="Tell us about your insurance needs..."
                  rows={4}
                />
              </div>
            </div>
          </motion.section>

          {/* Cards Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface-card rounded-2xl border border-border-light p-8"
          >
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-6">
              Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Auto Insurance</CardTitle>
                  <CardDescription>
                    Comprehensive cover for your vehicle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-body">
                    Protect your car against theft, accidents, and third-party
                    claims with our flexible auto insurance plans.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Quote</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Home Insurance</CardTitle>
                  <CardDescription>
                    Protect what matters most
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-body">
                    Safeguard your home and belongings with comprehensive
                    coverage tailored to South African homeowners.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Life Insurance</CardTitle>
                  <CardDescription>
                    Security for your loved ones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-body">
                    Ensure your family&apos;s financial future with our life
                    insurance policies designed for every stage of life.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    Compare Plans
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </motion.section>

          {/* Dialog Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-surface-card rounded-2xl border border-border-light p-8"
          >
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-6">
              Dialog
            </h2>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request a Callback</DialogTitle>
                  <DialogDescription>
                    Leave your details and one of our insurance specialists will
                    contact you within 24 hours.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="+27 82 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Preferred Time
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">
                          Morning (08:00 - 12:00)
                        </SelectItem>
                        <SelectItem value="afternoon">
                          Afternoon (12:00 - 17:00)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setDialogOpen(false);
                      toast.success("Callback request submitted!");
                    }}
                  >
                    Submit Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.section>

          {/* Table Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface-card rounded-2xl border border-border-light p-8"
          >
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-6">
              Table
            </h2>
            <Table>
              <TableCaption>Recent claims summary</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Policy Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">CLM-2024-001</TableCell>
                  <TableCell>Auto Insurance</TableCell>
                  <TableCell>15/01/2024</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Approved
                    </span>
                  </TableCell>
                  <TableCell className="text-right">R15,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CLM-2024-002</TableCell>
                  <TableCell>Home Insurance</TableCell>
                  <TableCell>22/01/2024</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Pending
                    </span>
                  </TableCell>
                  <TableCell className="text-right">R8,500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CLM-2024-003</TableCell>
                  <TableCell>Auto Insurance</TableCell>
                  <TableCell>28/01/2024</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Processing
                    </span>
                  </TableCell>
                  <TableCell className="text-right">R32,000.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </motion.section>

          {/* Colour Tokens Reference */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-surface-card rounded-2xl border border-border-light p-8"
          >
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-6">
              Theme Colour Reference
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-primary" />
                <p className="text-xs font-medium text-text-main">primary</p>
                <p className="text-xs text-text-muted">#BF0603</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-secondary" />
                <p className="text-xs font-medium text-text-main">secondary</p>
                <p className="text-xs text-text-muted">#690025</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-accent" />
                <p className="text-xs font-medium text-text-main">accent</p>
                <p className="text-xs text-text-muted">#EFF2A0</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-destructive" />
                <p className="text-xs font-medium text-text-main">destructive</p>
                <p className="text-xs text-text-muted">#DC2626</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-muted" />
                <p className="text-xs font-medium text-text-main">muted</p>
                <p className="text-xs text-text-muted">#F5F5F4</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-card border border-border" />
                <p className="text-xs font-medium text-text-main">card</p>
                <p className="text-xs text-text-muted">#FFFFFF</p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
