import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { fonts } from '../../styles/typography';

const TaskItem = ({ emoji, title, subtitle, xp, isCompleted, mode }) => {
  const isZoomer = mode === 'zoomer';
  
  return (
    <View style={[styles.taskItem, isZoomer && styles.zoomerTaskItem]}>
      <View style={[styles.taskIconContainer, isZoomer && styles.zoomerTaskIconContainer, isCompleted && styles.completedTaskIcon]}>
        {isZoomer ? (
          <Text style={styles.taskEmoji}>{emoji}</Text>
        ) : (
          <Ionicons
            name={isCompleted ? "checkmark" : "calendar-outline"}
            size={16}
            color={isCompleted ? "#2563EB" : "#9CA3AF"}
          />
        )}
      </View>
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <Text style={[styles.taskTitle, isZoomer && styles.zoomerTaskTitle]}>
            {title}
          </Text>
          {isZoomer && (
            <Text style={styles.taskXP}>+{xp} XP</Text>
          )}
        </View>
        {subtitle && (
          <Text style={[styles.taskSubtitle, isZoomer && styles.zoomerTaskSubtitle]}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

const getDefaultTasks = (mode) => {
  if (mode === 'zoomer') {
    return [
      {
        emoji: '✅',
        title: 'Complete Daily Quiz',
        subtitle: '5/5 questions answered',
        xp: 25,
        isCompleted: true
      },
      {
        emoji: '✅',
        title: 'Record Voice Snap',
        subtitle: 'Practiced "no cap" pronunciation',
        xp: 15,
        isCompleted: true
      },
      {
        emoji: '📱',
        title: 'Watch Slang in Action',
        subtitle: 'Watch a video with "rent free" usage',
        xp: 20,
        isCompleted: false
      }
    ];
  }
  return [
    {
      emoji: '✅',
      title: 'Complete Business Quiz',
      subtitle: '5/5 questions completed',
      xp: 25,
      isCompleted: true
    },
    {
      emoji: '✅',
      title: 'Record Presentation',
      subtitle: 'Practiced "touch base" usage',
      xp: 15,
      isCompleted: true
    },
    {
      emoji: '📱',
      title: 'Watch Example Video',
      subtitle: 'Learn "bottom line" in context',
      xp: 20,
      isCompleted: false
    }
  ];
};

const WeeklyGoals = ({
  mode = 'classic',
  tasks = getDefaultTasks(mode),
  weekNumber = 24
}) => {
  const isZoomer = mode === 'zoomer';
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  if (isZoomer) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.sectionTitle, styles.zoomerSectionTitle]}>
            Today's Goals
          </Text>
          <Text style={styles.zoomerProgress}>
            {completedTasks}/{tasks.length} Completed
          </Text>
        </View>

        <View style={[styles.card, styles.zoomerCard]}>
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              {...task}
              mode={mode}
            />
          ))}
        </View>
      </View>
    );
  }

  // Classic mode layout with weekly progress
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Weekly Goals</Text>
        <Text style={styles.weekNumber}>Week {weekNumber}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressCount}>
            {completedTasks}/{tasks.length} days
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${(completedTasks / tasks.length) * 100}%` }
            ]} 
          />
        </View>

        <View style={styles.progressStats}>
          <Text style={styles.progressPercentage}>
            {Math.round((completedTasks / tasks.length) * 100)}% complete
          </Text>
          <Text style={styles.daysLeft}>
            {tasks.length - completedTasks} days left
          </Text>
        </View>

        <View style={styles.tasksContainer}>
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              {...task}
              mode={mode}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
  },
  zoomerSectionTitle: {
    fontFamily: fonts.righteous,
    fontSize: 24,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  weekNumber: {
    fontSize: 14,
    color: '#2563EB',
  },
  zoomerProgress: {
    fontSize: 14,
    color: '#EC4899',
    fontFamily: fonts.righteous,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  zoomerCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    borderWidth: 0,
    padding: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressCount: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressPercentage: {
    fontSize: 12,
    color: '#6B7280',
  },
  daysLeft: {
    fontSize: 12,
    color: '#6B7280',
  },
  tasksContainer: {
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  zoomerTaskItem: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  taskIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  zoomerTaskIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#374151',
    marginRight: 12,
  },
  completedTaskIcon: {
    backgroundColor: '#065F46',
  },
  taskEmoji: {
    fontSize: 20,
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  taskTitle: {
    fontSize: 14,
    color: '#1F2937',
    fontFamily: fonts.georgia,
    marginBottom: 2,
  },
  zoomerTaskTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: fonts.righteous,
  },
  taskXP: {
    fontSize: 14,
    color: '#10B981',
    fontFamily: fonts.righteous,
  },
  taskSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  zoomerTaskSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: fonts.righteous,
  },
});

export default WeeklyGoals;