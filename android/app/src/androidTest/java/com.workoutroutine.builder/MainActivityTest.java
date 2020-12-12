package com.workoutroutine.builder;

import androidx.test.espresso.ViewInteraction;
import androidx.test.filters.SmallTest;
import androidx.test.rule.ActivityTestRule;
import androidx.test.runner.AndroidJUnit4;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import kotlin.jvm.JvmField;

import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.typeText;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import static androidx.test.espresso.matcher.ViewMatchers.isRoot;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static androidx.test.espresso.matcher.ViewMatchers.withText;
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;
import static androidx.test.espresso.matcher.ViewMatchers.withContentDescription;

import java.util.concurrent.TimeUnit;


import static org.hamcrest.Matchers.allOf;



@RunWith(AndroidJUnit4.class)

@SmallTest
public class MainActivityTest {

    @Rule
    public ActivityTestRule<MainActivity> activityActivityTestRule = new ActivityTestRule<MainActivity>(MainActivity.class);

    @Test
    public void signUpButtonText() throws InterruptedException {
        TimeUnit.SECONDS.sleep(10); // wait for 10 seconds to get slash screen away
        ViewInteraction signUpButton = onView(
                allOf(withContentDescription("signUpButton"), isDisplayed()));
        signUpButton.perform(click());
    }

    @Test
    public void signUpPossible() throws InterruptedException {
        TimeUnit.SECONDS.sleep(10); // wait for 10 seconds to get slash screen away
        ViewInteraction signUpButton = onView(
                allOf(withContentDescription("signUpButton"), isDisplayed()));
        signUpButton.perform(click());

        ViewInteraction nameTextBoxRegister = onView(
                allOf(withContentDescription("nameTextBoxRegister"), isDisplayed()));
        nameTextBoxRegister.perform(typeText("John Doe"));

        ViewInteraction createEmailTextBox = onView(
                allOf(withContentDescription("createEmailTextBox"), isDisplayed()));
        createEmailTextBox.perform(typeText("JohnDoe@email.com"));

        ViewInteraction createPasswordTextBox = onView(
                allOf(withContentDescription("createPasswordTextBox"), isDisplayed()));
        createPasswordTextBox.perform(typeText("password"));
    }

    @Test
    public void loginButtonTest() throws InterruptedException {
        TimeUnit.SECONDS.sleep(10); // wait for 10 seconds to get slash screen away
        ViewInteraction LoginButton = onView(
                allOf(withContentDescription("LoginButton"), isDisplayed()));
        LoginButton.perform(click());
    }

}