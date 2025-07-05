"use client"

// Judge Dashboard Component - Real-time compliance monitoring
import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription,
  Badge,
  Heading,
  Text,
  Button,
  Stack,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Progress,
  DateRangePicker,
} from '@/components/ui';
import { Search, Filter, Calendar, User, FileText, CheckCircle, AlertTriangle, Clock, ArrowUpRight } from 'lucide-react';

const PARTICIPANTS = [
  {
    id: 'p1',
    name: 'Marcus Johnson',
    status: 'onTrack',
    riskLevel: 'low',
    completedCheckins: 28,
    totalCheckins: 30,
    lastCheckIn: '2023-06-10T14:30:00Z',
    mentor: 'David Williams',
  },
  {
    id: 'p2',
    name: 'Jasmine Taylor',
    status: 'needsAttention',
    riskLevel: 'medium',
    completedCheckins: 22,
    totalCheckins: 30,
    lastCheckIn: '2023-06-09T09:15:00Z',
    mentor: 'Sarah Johnson',
  },
  {
    id: 'p3',
    name: 'DeAndre Wilson',
    status: 'atRisk',
    riskLevel: 'high',
    completedCheckins: 18,
    totalCheckins: 30,
    lastCheckIn: '2023-06-07T16:45:00Z',
    mentor: 'Michael Brown',
  },
  {
    id: 'p4',
    name: 'Aisha Robinson',
    status: 'onTrack',
    riskLevel: 'low',
    completedCheckins: 29,
    totalCheckins: 30,
    lastCheckIn: '2023-06-10T11:00:00Z',
    mentor: 'Lisa Davis',
  },
  {
    id: 'p5',
    name: 'Terrell Washington',
    status: 'needsAttention',
    riskLevel: 'medium',
    completedCheckins: 20,
    totalCheckins: 30,
    lastCheckIn: '2023-06-08T13:20:00Z',
    mentor: 'James Wilson',
  },
];

export default function JudgeDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const filteredParticipants = PARTICIPANTS.filter((participant) => {
    // Search filter
    const matchesSearch = participant.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleParticipantSelection = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const selectAllParticipants = () => {
    if (selectedParticipants.length === filteredParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(filteredParticipants.map(p => p.id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'onTrack':
        return <Badge variant="success">On Track</Badge>;
      case 'needsAttention':
        return <Badge variant="warning">Needs Attention</Badge>;
      case 'atRisk':
        return <Badge variant="error">At Risk</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'onTrack':
        return 'bg-success';
      case 'needsAttention':
        return 'bg-warning';
      case 'atRisk':
        return 'bg-error';
      default:
        return 'bg-white/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="py-8">
      <Container>
        <Stack spacing="lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Heading as="h1">Judge Dashboard</Heading>
              <Text textColor="muted" className="mt-1">
                Monitor and manage participant progress in your restorative justice program
              </Text>
            </div>
            <div className="flex gap-3">
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Hearings
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text textColor="muted" size="sm">Total Participants</Text>
                    <Heading as="h2" className="mt-1">{PARTICIPANTS.length}</Heading>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text textColor="muted" size="sm">Requiring Attention</Text>
                    <Heading as="h2" className="mt-1">
                      {PARTICIPANTS.filter(p => p.status !== 'onTrack').length}
                    </Heading>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text textColor="muted" size="sm">Check-ins Today</Text>
                    <Heading as="h2" className="mt-1">12</Heading>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                <div>
                  <CardTitle>Participant Overview</CardTitle>
                  <CardDescription>
                    Monitor participant progress and check-in compliance
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                  <div className="w-full sm:w-auto">
                    <Input 
                      placeholder="Search participants..." 
                      icon={<Search className="h-4 w-4" />}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-[180px]">
                    <Select 
                      value={statusFilter} 
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="onTrack">On Track</SelectItem>
                        <SelectItem value="needsAttention">Needs Attention</SelectItem>
                        <SelectItem value="atRisk">At Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:w-auto">
                    <DateRangePicker
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      placeholder="Filter by date"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5">
                  <div className="col-span-1">
                    <Checkbox
                      checked={selectedParticipants.length === filteredParticipants.length && filteredParticipants.length > 0}
                      onCheckedChange={selectAllParticipants}
                      aria-label="Select all participants"
                    />
                  </div>
                  <div className="col-span-3 font-medium">Participant</div>
                  <div className="col-span-2 font-medium">Status</div>
                  <div className="col-span-3 font-medium">Check-In Progress</div>
                  <div className="col-span-3 font-medium">Last Check-In</div>
                </div>
                
                {filteredParticipants.length === 0 ? (
                  <div className="p-8 text-center">
                    <Text textColor="muted">No participants found matching your filters.</Text>
                  </div>
                ) : (
                  <div>
                    {filteredParticipants.map((participant) => (
                      <div 
                        key={participant.id} 
                        className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <div className="col-span-1">
                          <Checkbox
                            checked={selectedParticipants.includes(participant.id)}
                            onCheckedChange={() => toggleParticipantSelection(participant.id)}
                            aria-label={`Select ${participant.name}`}
                          />
                        </div>
                        <div className="col-span-3 flex items-center">
                          <div className="font-medium">{participant.name}</div>
                        </div>
                        <div className="col-span-2 flex items-center">
                          {getStatusBadge(participant.status)}
                        </div>
                        <div className="col-span-3 flex flex-col justify-center">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">{participant.completedCheckins}/{participant.totalCheckins} Check-ins</span>
                            <span className="text-xs">{Math.round((participant.completedCheckins / participant.totalCheckins) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(participant.completedCheckins / participant.totalCheckins) * 100} 
                            className="[&>div]:bg-current [&>div]"
                          >
                            <div className={getProgressColor(participant.status)} />
                          </Progress>
                        </div>
                        <div className="col-span-3 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-white/50" />
                          <span>{formatDate(participant.lastCheckIn)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Text textColor="muted" size="sm">
                  Showing {filteredParticipants.length} of {PARTICIPANTS.length} participants
                </Text>
                <div className="flex gap-2">
                  {selectedParticipants.length > 0 && (
                    <Button size="sm" variant="outline">
                      Message Selected
                    </Button>
                  )}
                  <Button size="sm">
                    View All Participants
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </div>
  );
} 