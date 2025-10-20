# Timer Application - Comprehensive Test Plan

## Application Overview

The Timer Application (https://kishizaki-42.github.io/timer/) is a Japanese-language web-based timer utility that provides two distinct timing modes:

- **Countdown Timer (カウントダウン)**: Allows users to set a specific duration and count down to zero
- **Stopwatch (ストップウォッチ)**: Allows users to measure elapsed time counting upward from zero

### Key Features

- **Dual Mode Interface**: Tab-based navigation between Countdown and Stopwatch modes
- **Custom Time Input**: Manual time entry via spinbutton controls for hours, minutes, and seconds
- **Quick Preset**: 5-minute preset button for rapid countdown setup
- **Timer Controls**: Start, Pause/Resume, and Reset functionality
- **Visual Feedback**: Large digital display showing time in HH:MM:SS format
- **Completion Notification**: Alert message and vibration/system notification on countdown completion
- **Title Updates**: Browser tab title shows current timer value
- **Input Validation**: Prevents starting countdown with zero or negative values

## Test Scenarios

### 1. Countdown Timer - Basic Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1 Load Initial Countdown State
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Observe the initial page state

**Expected Results:**
- Page loads successfully
- "カウントダウン" (Countdown) tab is selected by default
- Timer display shows "00:05:00"
- Hour spinbutton shows "0"
- Minute spinbutton shows "5"
- Second spinbutton shows "0"
- "5分セット" (5 minute preset) button is visible and enabled
- "スタート" (Start) button is enabled
- "一時停止" (Pause) button is disabled
- "リセット" (Reset) button is disabled
- Timer icon is visible
- Page title displays "00:05:00 - カウントダウン"
- Information message about vibration and system notifications is visible

#### 1.2 Start Countdown with Default 5 Minutes
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "スタート" (Start) button

**Expected Results:**
- Timer begins counting down from 05:00
- Timer display updates every second (e.g., "00:04:59", "00:04:58")
- Page title updates to reflect current time
- "スタート" (Start) button becomes disabled
- "一時停止" (Pause) button becomes enabled
- "リセット" (Reset) button becomes enabled
- Hour, minute, and second spinbuttons become disabled

#### 1.3 Pause Running Countdown
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "スタート" (Start) button
3. Wait for timer to count down for 3-5 seconds
4. Click the "一時停止" (Pause) button

**Expected Results:**
- Timer stops counting down immediately
- Timer display freezes at current value
- "一時停止" (Pause) button becomes disabled
- "再開" (Resume) button becomes enabled and visible
- "リセット" (Reset) button remains enabled
- Spinbuttons remain disabled

#### 1.4 Resume Paused Countdown
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "スタート" (Start) button
3. Wait 3-5 seconds
4. Click the "一時停止" (Pause) button
5. Click the "再開" (Resume) button

**Expected Results:**
- Timer resumes counting down from paused value
- Timer display continues updating every second
- "再開" (Resume) button becomes disabled
- "一時停止" (Pause) button becomes enabled
- "リセット" (Reset) button remains enabled

#### 1.5 Reset Running Countdown
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "スタート" (Start) button
3. Wait 3-5 seconds
4. Click the "リセット" (Reset) button

**Expected Results:**
- Timer stops counting
- Timer display returns to the originally set time (e.g., "00:05:00")
- "スタート" (Start) button becomes enabled
- "一時停止" (Pause) button becomes disabled
- "リセット" (Reset) button becomes disabled
- Hour, minute, and second spinbuttons become enabled and show original values

#### 1.6 Reset Paused Countdown
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "スタート" (Start) button
3. Wait 3-5 seconds
4. Click the "一時停止" (Pause) button
5. Click the "リセット" (Reset) button

**Expected Results:**
- Timer resets to originally set time
- "スタート" (Start) button becomes enabled
- "一時停止" (Pause) button becomes disabled
- "リセット" (Reset) button becomes disabled
- Spinbuttons become enabled

#### 1.7 Complete Full Countdown Cycle
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Clear the minute spinbutton and enter "0"
3. Click the second spinbutton and enter "3"
4. Click the "スタート" (Start) button
5. Wait for countdown to reach 00:00:00

**Expected Results:**
- Timer counts down: 00:00:03 → 00:00:02 → 00:00:01 → 00:00:00
- When timer reaches 00:00:00, an alert message appears: "タイマーが完了しました！" (Timer completed!)
- Page title shows "00:00:00 - カウントダウン"
- Vibration occurs (on supported devices)
- System notification may appear (on supported browsers)
- "スタート" (Start) button becomes enabled
- "一時停止" (Pause) button becomes disabled
- "リセット" (Reset) button becomes disabled
- Spinbuttons remain at their set values and become enabled

### 2. Countdown Timer - Custom Time Input

**Seed:** `tests/seed.spec.ts`

#### 2.1 Set Custom Time Using Spinbuttons
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the hour spinbutton
3. Type "2"
4. Click the minute spinbutton
5. Type "30"
6. Click the second spinbutton
7. Type "45"

**Expected Results:**
- Hour spinbutton displays "2"
- Minute spinbutton displays "30"
- Second spinbutton displays "45"
- Timer display remains at previous value until started
- "スタート" (Start) button remains enabled

#### 2.2 Start Countdown with Custom Time
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set hours to "1", minutes to "15", seconds to "30"
3. Click the "スタート" (Start) button

**Expected Results:**
- Timer display updates to "01:15:30"
- Timer begins counting down immediately
- Page title updates to "01:15:30 - カウントダウン" then continues counting
- All control button states update correctly (Start disabled, Pause enabled, Reset enabled)
- Spinbuttons become disabled

#### 2.3 Change Time Values After Starting
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set custom time values
3. Click the "スタート" (Start) button
4. Attempt to click or modify spinbutton values

**Expected Results:**
- Spinbuttons are disabled and cannot be modified
- Timer continues running unaffected
- Values in spinbuttons remain visible but uneditable

#### 2.4 Set Maximum Valid Values
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set hours to "23", minutes to "59", seconds to "59"
3. Click the "スタート" (Start) button

**Expected Results:**
- Timer displays "23:59:59"
- Timer begins counting down normally
- Page title updates correctly
- Timer can count down from maximum values

#### 2.5 Set Hours Only
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set hours to "3", leave minutes at "5", leave seconds at "0"
3. Click the "スタート" (Start) button

**Expected Results:**
- Timer displays "03:05:00"
- Timer counts down correctly
- Timer handles hours correctly (displays as "02:59:59" after one minute one second)

#### 2.6 Set Seconds Only
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set hours to "0", minutes to "0", seconds to "30"
3. Click the "スタート" (Start) button

**Expected Results:**
- Timer displays "00:00:30"
- Timer counts down correctly
- Timer completes after 30 seconds

### 3. Countdown Timer - Preset Button

**Seed:** `tests/seed.spec.ts`

#### 3.1 Use 5 Minute Preset Button
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "5分セット" (5 minute preset) button

**Expected Results:**
- Timer display shows "00:05:00"
- Hour spinbutton shows "0"
- Minute spinbutton shows "5"
- Second spinbutton shows "0"
- "5分セット" button appears active/selected
- Timer is ready to start but not running

#### 3.2 Override Custom Time with Preset
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set custom time: hours "2", minutes "30", seconds "15"
3. Click the "5分セット" (5 minute preset) button

**Expected Results:**
- Timer display updates to "00:05:00"
- All spinbuttons reset to 5-minute values (0 hours, 5 minutes, 0 seconds)
- Custom time is replaced with preset time
- Timer is not running

#### 3.3 Use Preset During Running Timer
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set time to "0" hours, "10" minutes, "0" seconds
3. Click "スタート" (Start)
4. Wait 3-5 seconds
5. Click the "5分セット" (5 minute preset) button

**Expected Results:**
- Timer stops running
- Timer display resets to "00:05:00"
- Spinbuttons update to preset values
- Control buttons return to initial state (Start enabled, Pause disabled, Reset disabled)

#### 3.4 Use Preset After Completion
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set a short timer (e.g., 3 seconds)
3. Click "スタート" (Start)
4. Wait for completion message
5. Click the "5分セット" (5 minute preset) button

**Expected Results:**
- Completion alert message disappears
- Timer display updates to "00:05:00"
- Spinbuttons update to preset values
- Timer is ready to start again

### 4. Countdown Timer - Validation and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 4.1 Attempt to Start with Zero Time
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set hours to "0", minutes to "0", seconds to "0"
3. Click the "スタート" (Start) button

**Expected Results:**
- Timer does not start
- Alert message appears: "1秒以上の時間を設定してください。" (Please set a time of 1 second or more)
- Timer display remains at "00:00:00"
- "スタート" (Start) button remains enabled
- Spinbuttons remain editable

#### 4.2 Enter Negative Value in Spinbutton
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the second spinbutton
3. Type "-5"
4. Click outside the spinbutton

**Expected Results:**
- Spinbutton accepts the negative value "-5" in the input field
- Timer display does not update until start is clicked
- Note: Application should validate on start attempt

#### 4.3 Start Timer with Negative Value
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set seconds to "-5"
3. Click the "スタート" (Start) button

**Expected Results:**
- Application should either prevent negative values or show validation error
- Timer should not start with negative values
- Appropriate error message should be displayed

#### 4.4 Enter Very Large Numbers
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set hours to "999"
3. Set minutes to "999"
4. Set seconds to "999"
5. Click the "スタート" (Start) button

**Expected Results:**
- Application accepts or validates the large values
- If accepted, timer displays and counts down correctly
- If rejected, appropriate validation message is shown

#### 4.5 Enter Non-Numeric Characters
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the minute spinbutton
3. Type "abc"

**Expected Results:**
- Spinbutton rejects non-numeric input or shows validation error
- Field should only accept numeric characters
- Timer remains in valid state

#### 4.6 Enter Decimal Values
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the second spinbutton
3. Type "3.5"

**Expected Results:**
- Application handles decimal input appropriately
- Either accepts and rounds to integer, or rejects decimal values
- Clear feedback is provided to user

#### 4.7 Clear Spinbutton Value
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the minute spinbutton
3. Select all text and delete
4. Click outside the spinbutton

**Expected Results:**
- Spinbutton handles empty value appropriately
- Either defaults to "0" or shows validation message
- Timer remains in valid state

### 5. Stopwatch - Basic Functionality

**Seed:** `tests/seed.spec.ts`

#### 5.1 Load Stopwatch Tab
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab

**Expected Results:**
- Stopwatch tab becomes selected/active
- Timer display shows "00:00:00"
- Time input spinbuttons are not visible
- "5分セット" preset button is not visible
- "スタート" (Start) button is enabled
- "一時停止" (Pause) button is disabled
- "リセット" (Reset) button is disabled
- Page title updates to "00:00:00 - ストップウォッチ"
- Information message about notifications is visible

#### 5.2 Start Stopwatch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab
3. Click the "スタート" (Start) button

**Expected Results:**
- Stopwatch begins counting up from 00:00:00
- Timer display updates every second (e.g., "00:00:01", "00:00:02")
- Page title updates to reflect current time
- "スタート" (Start) button becomes disabled
- "一時停止" (Pause) button becomes enabled
- "リセット" (Reset) button becomes enabled

#### 5.3 Pause Running Stopwatch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab
3. Click the "スタート" (Start) button
4. Wait for stopwatch to run for 5-10 seconds
5. Click the "一時停止" (Pause) button

**Expected Results:**
- Stopwatch stops counting immediately
- Timer display freezes at current value
- "一時停止" (Pause) button becomes disabled
- "再開" (Resume) button becomes enabled and visible
- "リセット" (Reset) button remains enabled
- Page title shows frozen time value

#### 5.4 Resume Paused Stopwatch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab
3. Click the "スタート" (Start) button
4. Wait 5-10 seconds
5. Click the "一時停止" (Pause) button
6. Click the "再開" (Resume) button

**Expected Results:**
- Stopwatch resumes counting from paused value
- Timer display continues updating every second
- "再開" (Resume) button becomes disabled
- "一時停止" (Pause) button becomes enabled
- "リセット" (Reset) button remains enabled
- Time continues incrementing from paused value

#### 5.5 Reset Running Stopwatch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab
3. Click the "スタート" (Start) button
4. Wait 5-10 seconds
5. Click the "リセット" (Reset) button

**Expected Results:**
- Stopwatch stops counting
- Timer display returns to "00:00:00"
- "スタート" (Start) button becomes enabled
- "一時停止" (Pause) button becomes disabled
- "リセット" (Reset) button becomes disabled
- Page title updates to "00:00:00 - ストップウォッチ"

#### 5.6 Reset Paused Stopwatch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab
3. Click the "スタート" (Start) button
4. Wait 5-10 seconds
5. Click the "一時停止" (Pause) button
6. Click the "リセット" (Reset) button

**Expected Results:**
- Stopwatch resets to "00:00:00"
- "スタート" (Start) button becomes enabled
- "一時停止" (Pause) button becomes disabled
- "リセット" (Reset) button becomes disabled

#### 5.7 Run Stopwatch Beyond One Minute
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab
3. Click the "スタート" (Start) button
4. Wait for stopwatch to reach and pass 00:01:00

**Expected Results:**
- Stopwatch correctly transitions from "00:00:59" to "00:01:00"
- Minutes increment correctly
- Seconds reset to "00" after reaching "59"
- Timer continues running smoothly

#### 5.8 Run Stopwatch Beyond One Hour
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab
3. Click the "スタート" (Start) button
4. Let stopwatch run for extended period or manually test transition at 00:59:59

**Expected Results:**
- Stopwatch correctly transitions from "00:59:59" to "01:00:00"
- Hours increment correctly
- Minutes and seconds reset appropriately
- Timer display handles hour values properly

### 6. Tab Navigation and State Management

**Seed:** `tests/seed.spec.ts`

#### 6.1 Switch from Countdown to Stopwatch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Observe the "カウントダウン" (Countdown) tab is selected
3. Click the "ストップウォッチ" (Stopwatch) tab

**Expected Results:**
- Stopwatch tab becomes active/selected
- Countdown tab becomes inactive
- Timer display changes to stopwatch display
- Interface updates to show stopwatch controls
- No spinbuttons or preset button visible
- Page title updates to stopwatch format

#### 6.2 Switch from Stopwatch to Countdown
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab
3. Click the "カウントダウン" (Countdown) tab

**Expected Results:**
- Countdown tab becomes active/selected
- Stopwatch tab becomes inactive
- Timer display changes to countdown display
- Interface updates to show countdown controls
- Spinbuttons and preset button become visible
- Default 5-minute time is displayed

#### 6.3 Switch Tabs During Running Countdown
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Start a countdown timer
3. Wait 3-5 seconds
4. Click the "ストップウォッチ" (Stopwatch) tab
5. Click the "カウントダウン" (Countdown) tab

**Expected Results:**
- Switching to stopwatch tab stops/resets the countdown
- Returning to countdown tab shows reset state (default 5 minutes)
- Running countdown state is not preserved when switching tabs
- Timer display and controls reset to initial countdown state

#### 6.4 Switch Tabs During Running Stopwatch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click the "ストップウォッチ" (Stopwatch) tab
3. Start the stopwatch
4. Wait 5-10 seconds
5. Click the "カウントダウン" (Countdown) tab
6. Click the "ストップウォッチ" (Stopwatch) tab

**Expected Results:**
- Switching to countdown tab stops/resets the stopwatch
- Returning to stopwatch tab shows reset state (00:00:00)
- Running stopwatch state is not preserved when switching tabs
- Timer display and controls reset to initial stopwatch state

#### 6.5 Switch Tabs During Paused Timer
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Start countdown timer
3. Pause the countdown
4. Click the "ストップウォッチ" (Stopwatch) tab
5. Click the "カウントダウン" (Countdown) tab

**Expected Results:**
- Paused timer state is not preserved
- Countdown resets to default state when returning
- No error occurs during tab switching

### 7. Visual Elements and Display

**Seed:** `tests/seed.spec.ts`

#### 7.1 Verify Timer Icon Display
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Observe the timer icon at the top of the page

**Expected Results:**
- Timer icon is visible
- Icon has alt text "タイマーアイコン"
- Icon appears above the "タイマー" heading

#### 7.2 Verify Heading Display
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Observe the page heading

**Expected Results:**
- "タイマー" (Timer) heading is visible
- Heading is properly formatted as an H1 element
- Heading is prominently displayed

#### 7.3 Verify Timer Display Formatting
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Observe the timer display showing "00:05:00"

**Expected Results:**
- Timer is displayed in large, readable format
- Format is HH:MM:SS with colons as separators
- All digits are zero-padded (e.g., "05" not "5")
- Display is prominently positioned

#### 7.4 Verify Spinbutton Labels
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Observe the time input spinbuttons

**Expected Results:**
- Hour spinbutton is labeled "時間" (Hours)
- Minute spinbutton is labeled "分" (Minutes)
- Second spinbutton is labeled "秒" (Seconds)
- Labels are clearly visible above or near each spinbutton

#### 7.5 Verify Button Labels and States
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Observe all buttons in their default state

**Expected Results:**
- "5分セット" preset button is clearly labeled and visible
- "スタート" (Start) button is clearly labeled and appears enabled
- "一時停止" (Pause) button is clearly labeled and appears disabled
- "リセット" (Reset) button is clearly labeled and appears disabled
- Disabled buttons have appropriate visual indication

#### 7.6 Verify Information Message
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Scroll to bottom of page if necessary
3. Observe the information message

**Expected Results:**
- Message states: "完了時に短いバイブレーションとシステム通知を送信します（対応ブラウザのみ）。"
- Message is clearly visible and readable
- Message provides context about vibration and notification features

#### 7.7 Verify Alert Message Display
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set all time values to "0"
3. Click "スタート" (Start) button

**Expected Results:**
- Alert message appears clearly visible
- Alert states: "1秒以上の時間を設定してください。"
- Alert is properly formatted and stands out
- Alert disappears when valid time is set

#### 7.8 Verify Completion Alert Display
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set a 3-second countdown
3. Start the timer
4. Wait for completion

**Expected Results:**
- Completion alert appears clearly visible
- Alert states: "タイマーが完了しました！"
- Alert is prominently displayed
- Alert persists until user takes action

#### 7.9 Verify Tab Visual States
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Observe the default selected tab
3. Click the other tab
4. Observe the tab state change

**Expected Results:**
- Active tab has distinct visual appearance (e.g., highlighted, different color)
- Inactive tab has subdued appearance
- Tab states are clearly distinguishable
- Cursor changes to pointer when hovering over tabs

#### 7.10 Verify Button Visual States on Interaction
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Start countdown
3. Observe button state changes

**Expected Results:**
- Enabled buttons have pointer cursor on hover
- Disabled buttons do not have pointer cursor
- Button states are visually distinct (enabled vs disabled)
- Active/focused buttons may have visual indication

### 8. Page Title and Browser Integration

**Seed:** `tests/seed.spec.ts`

#### 8.1 Verify Default Page Title
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Observe the browser tab title

**Expected Results:**
- Page title displays "00:05:00 - カウントダウン"
- Title format is [TIME] - [MODE]

#### 8.2 Verify Page Title During Countdown
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Start countdown
3. Observe the browser tab title updating

**Expected Results:**
- Page title updates continuously with current countdown time
- Format remains consistent: [TIME] - カウントダウン
- Title updates every second

#### 8.3 Verify Page Title for Stopwatch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click "ストップウォッチ" tab

**Expected Results:**
- Page title changes to "00:00:00 - ストップウォッチ"
- Title reflects stopwatch mode

#### 8.4 Verify Page Title During Running Stopwatch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click "ストップウォッチ" tab
3. Start stopwatch
4. Observe the browser tab title

**Expected Results:**
- Page title updates continuously with elapsed time
- Format remains: [TIME] - ストップウォッチ
- Title updates every second

#### 8.5 Verify Page Title on Completion
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set 3-second countdown
3. Start and wait for completion
4. Observe the browser tab title

**Expected Results:**
- Page title shows "00:00:00 - カウントダウン" upon completion
- Title reflects final state

### 9. Accessibility Testing

**Seed:** `tests/seed.spec.ts`

#### 9.1 Verify Tab Navigation with Keyboard
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Press Tab key repeatedly
3. Observe focus moving through interactive elements

**Expected Results:**
- Tab key moves focus through all interactive elements in logical order
- Focus order: tabs → spinbuttons → preset button → control buttons
- Focus indicator is visible on each element
- All interactive elements are keyboard accessible

#### 9.2 Verify Tab Switching with Keyboard
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Tab to the tab navigation area
3. Use arrow keys or Enter/Space to switch tabs

**Expected Results:**
- Arrow keys navigate between tabs (if supported)
- Enter or Space key activates selected tab
- Tab switching works entirely via keyboard
- Appropriate ARIA attributes are present

#### 9.3 Verify Button Activation with Keyboard
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Tab to "スタート" button
3. Press Enter or Space key
4. Tab to "一時停止" button when enabled
5. Press Enter or Space key

**Expected Results:**
- Enter key activates buttons
- Space key activates buttons
- Disabled buttons do not respond to keyboard activation
- Button activation via keyboard produces same result as mouse click

#### 9.4 Verify Spinbutton Keyboard Controls
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Tab to a spinbutton
3. Use arrow keys to increment/decrement (if supported)
4. Type numeric values

**Expected Results:**
- Spinbuttons can be focused with Tab key
- Arrow keys may increment/decrement values (standard spinbutton behavior)
- Typing numbers updates the value
- Spinbuttons have appropriate ARIA roles and labels

#### 9.5 Verify Screen Reader Support
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Use screen reader to navigate page
3. Verify announcements for all elements

**Expected Results:**
- All interactive elements have accessible names
- Tab roles are properly announced
- Button states (enabled/disabled) are announced
- Spinbutton labels and values are announced
- Timer role is properly identified
- Alert messages are announced when they appear

### 10. Performance and Timing Accuracy

**Seed:** `tests/seed.spec.ts`

#### 10.1 Verify Countdown Timing Accuracy
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set countdown to "0" hours, "1" minute, "0" seconds
3. Start countdown
4. Use external timer to verify accuracy
5. Wait for completion

**Expected Results:**
- Countdown completes in approximately 60 seconds (±1-2 seconds acceptable)
- Timer updates appear smooth and regular
- No significant drift from actual time
- Completion occurs at expected time

#### 10.2 Verify Stopwatch Timing Accuracy
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click "ストップウォッチ" tab
3. Start stopwatch
4. Use external timer to verify accuracy
5. Let run for 1 minute

**Expected Results:**
- Stopwatch tracks time with reasonable accuracy (±1-2 seconds acceptable)
- Updates appear smooth and regular
- No significant drift from actual time

#### 10.3 Verify Timer Performance During Pause/Resume
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set 2-minute countdown
3. Start timer
4. After 30 seconds, pause
5. Wait 10 seconds
6. Resume timer
7. Verify completion time

**Expected Results:**
- Paused time is not counted toward countdown
- Resume continues from exact paused value
- Total running time is approximately 2 minutes (not including pause duration)
- Pause/resume does not introduce timing errors

#### 10.4 Verify Performance with Multiple Pause/Resume Cycles
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Set 30-second countdown
3. Start, then pause and resume 5-10 times during countdown
4. Verify completion time

**Expected Results:**
- Multiple pause/resume cycles do not affect timing accuracy
- Timer completes at expected time based on total running time
- No accumulation of timing errors

### 11. Browser Compatibility and Responsive Design

**Seed:** `tests/seed.spec.ts`

#### 11.1 Test on Desktop Chrome
**Steps:**
1. Open https://kishizaki-42.github.io/timer/ in Chrome
2. Test all core functionality

**Expected Results:**
- All features work correctly
- Layout is proper
- Notifications work (if permissions granted)
- Timer updates smoothly

#### 11.2 Test on Desktop Firefox
**Steps:**
1. Open https://kishizaki-42.github.io/timer/ in Firefox
2. Test all core functionality

**Expected Results:**
- All features work correctly
- Layout is proper
- Notifications work (if permissions granted)
- Timer updates smoothly

#### 11.3 Test on Desktop Safari
**Steps:**
1. Open https://kishizaki-42.github.io/timer/ in Safari
2. Test all core functionality

**Expected Results:**
- All features work correctly
- Layout is proper
- Notifications work (if permissions granted)
- Timer updates smoothly

#### 11.4 Test on Mobile Safari (iOS)
**Steps:**
1. Open https://kishizaki-42.github.io/timer/ on iPhone/iPad
2. Test all core functionality
3. Test vibration on completion

**Expected Results:**
- Layout is responsive and usable on mobile
- Touch interactions work properly
- Timer remains accurate
- Vibration works on completion (if supported)

#### 11.5 Test on Mobile Chrome (Android)
**Steps:**
1. Open https://kishizaki-42.github.io/timer/ on Android device
2. Test all core functionality
3. Test vibration on completion

**Expected Results:**
- Layout is responsive and usable on mobile
- Touch interactions work properly
- Timer remains accurate
- Vibration works on completion (if supported)

#### 11.6 Test Responsive Layout at Different Viewport Sizes
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Resize browser window to various widths (320px, 768px, 1024px, 1920px)
3. Observe layout changes

**Expected Results:**
- Layout adapts to different screen sizes
- All elements remain visible and accessible
- No horizontal scrolling required
- Text remains readable at all sizes
- Interactive elements remain easily clickable/tappable

### 12. Edge Cases and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 12.1 Test Rapid Button Clicking
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Rapidly click Start button multiple times
3. Rapidly click Pause/Resume buttons multiple times

**Expected Results:**
- Application handles rapid clicks gracefully
- No duplicate timers are started
- Timer state remains consistent
- No JavaScript errors occur

#### 12.2 Test Timer Behavior When Page Loses Focus
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Start countdown
3. Switch to another browser tab or application
4. Wait 30+ seconds
5. Return to timer tab

**Expected Results:**
- Timer continues running in background
- Timer display updates to show current value when tab regains focus
- No significant timing drift
- Title updates even when tab is not visible

#### 12.3 Test Timer Behavior with System Sleep/Wake
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Start countdown or stopwatch
3. Put computer to sleep for several minutes
4. Wake computer and observe timer

**Expected Results:**
- Timer handles sleep/wake gracefully
- Timer either pauses during sleep or accounts for sleep time
- No JavaScript errors occur
- Application remains functional after wake

#### 12.4 Test Timer at Exactly Midnight
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/ before midnight
2. Start timer that will run past midnight
3. Observe timer behavior across midnight boundary

**Expected Results:**
- Timer continues running correctly across midnight
- No timing issues or errors occur
- Date change does not affect timer functionality

#### 12.5 Test Multiple Browser Windows
**Steps:**
1. Open https://kishizaki-42.github.io/timer/ in two browser windows
2. Start countdown in first window
3. Start different timer in second window
4. Observe both timers

**Expected Results:**
- Each window operates independently
- Timers do not interfere with each other
- Both timers function correctly simultaneously

#### 12.6 Test After Network Disconnection
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Disconnect from internet
3. Test all timer functionality

**Expected Results:**
- Timer continues to function offline
- All features work without network connection
- Application is fully client-side functional

### 13. Notification and Vibration Features

**Seed:** `tests/seed.spec.ts`

#### 13.1 Test Vibration on Countdown Completion (Mobile)
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/ on mobile device
2. Set short countdown (3 seconds)
3. Start countdown
4. Wait for completion
5. Feel for vibration

**Expected Results:**
- Device vibrates briefly on completion
- Vibration is noticeable but not excessive
- Vibration occurs simultaneously with completion alert

#### 13.2 Test System Notification on Completion (Desktop)
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/ on desktop
2. Grant notification permissions if prompted
3. Set short countdown (3 seconds)
4. Start countdown
5. Switch to another tab or application
6. Wait for completion

**Expected Results:**
- System notification appears when timer completes
- Notification contains appropriate message
- Notification appears even when tab is not active
- Clicking notification brings user back to timer tab

#### 13.3 Test Notification Permission Denial
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/ in incognito/private mode
2. Deny notification permissions if prompted
3. Complete a countdown timer

**Expected Results:**
- Timer functions normally without notifications
- Completion alert still appears in page
- No errors occur due to denied permissions
- Application gracefully handles missing notification support

#### 13.4 Test on Browser Without Vibration Support
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/ on desktop browser
2. Complete a countdown timer

**Expected Results:**
- Timer completes normally
- No vibration occurs (not supported on desktop)
- No JavaScript errors occur
- Application handles missing vibration API gracefully

### 14. URL and Deep Linking

**Seed:** `tests/seed.spec.ts`

#### 14.1 Test Direct URL Access
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/

**Expected Results:**
- Page loads successfully
- Default countdown tab is displayed
- All functionality is available
- No errors occur

#### 14.2 Test URL After Tab Switch
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click "ストップウォッチ" tab
3. Observe URL

**Expected Results:**
- URL may update to reflect current tab (if implemented)
- OR URL remains unchanged
- Application state correctly reflects stopwatch mode

#### 14.3 Test Browser Back/Forward with Tab Changes
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Click "ストップウォッチ" tab
3. Click browser back button
4. Click browser forward button

**Expected Results:**
- Back/forward buttons may navigate between tab states (if history is managed)
- OR back/forward buttons navigate to previous/next pages
- No errors occur
- Application remains functional

#### 14.4 Test Page Refresh During Timer
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Start countdown
3. Wait 10 seconds
4. Refresh page

**Expected Results:**
- Page reloads successfully
- Timer resets to default state (timer state is not persisted)
- No errors occur
- Application is fully functional after refresh

#### 14.5 Test Bookmark and Reopen
**Steps:**
1. Navigate to https://kishizaki-42.github.io/timer/
2. Bookmark the page
3. Close browser
4. Reopen browser and load bookmark

**Expected Results:**
- Page loads successfully from bookmark
- Default state is displayed
- All functionality works correctly

## Test Environment Requirements

- **Browsers**: Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
- **Mobile Devices**: iOS (Safari), Android (Chrome)
- **Screen Sizes**: 320px (mobile), 768px (tablet), 1024px (desktop), 1920px (large desktop)
- **Screen Reader**: NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- **Network Conditions**: Online, Offline
- **Permissions**: Allow and deny notification permissions

## Known Limitations and Observations

1. **Tab Switching Behavior**: Switching between Countdown and Stopwatch tabs resets any running timer. Timer state is not preserved across tab changes.

2. **Input Validation**: The application accepts negative values in spinbuttons but validates on start attempt. Enhanced client-side validation could prevent entry of invalid values.

3. **Large Number Handling**: Testing with very large numbers (999+ hours) may reveal limits or display issues.

4. **Favicon**: 404 error for favicon.ico (minor cosmetic issue).

5. **Notification Support**: Vibration and system notifications depend on browser and device capabilities. Testing should verify graceful degradation on unsupported platforms.

6. **Timer Accuracy**: JavaScript timers are not perfectly accurate. Acceptable drift is ±1-2 seconds per minute.

7. **Persistence**: Timer state is not saved in localStorage or session storage. Refreshing the page resets all timers.

## Test Data Requirements

- Valid time values: 0-23 hours, 0-59 minutes, 0-59 seconds
- Edge values: 0, 1, 59, 60, 99, 999
- Invalid values: negative numbers, decimals, non-numeric characters, empty strings
- Common presets: 3 seconds (for quick testing), 5 minutes (default), 1 hour, 2 hours 30 minutes

## Success Criteria

A test scenario passes when:
1. All expected results are observed
2. No JavaScript errors appear in console
3. No visual glitches or layout issues occur
4. Timer accuracy is within acceptable range (±2 seconds per minute)
5. All interactive elements respond appropriately
6. Accessibility requirements are met
7. Application remains functional after test completion
