function toggleDetails(rowId) {
    const row = document.getElementById(rowId);

    if (row.style.display === "table-row") {
        row.style.display = "none";
    } else {
        row.style.display = "table-row";
    }
}

function showForm() {
    const selectedMeals = document.querySelectorAll(".meal-check:checked");

    if (selectedMeals.length === 0) {
        alert("يرجى اختيار وجبة واحدة على الأقل");
        return;
    }

    document.getElementById("orderFormSection").classList.remove("hidden");
}

function clearErrors() {
    document.getElementById("nameError").innerText = "";
    document.getElementById("idError").innerText = "";
    document.getElementById("birthError").innerText = "";
    document.getElementById("mobileError").innerText = "";
    document.getElementById("emailError").innerText = "";
}

function submitOrder() {
    clearErrors();

    let isValid = true;

    const fullName = document.getElementById("fullName").value.trim();
    const nationalId = document.getElementById("nationalId").value.trim();
    const birthDate = document.getElementById("birthDate").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();

    const arabicNameRegex = /^[\u0621-\u064A\s]+$/;
    const nationalIdRegex = /^(0[1-9]|1[0-4])\d{9}$/;
    const mobileRegex = /^(09\d{8})$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const birthDateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

let isValid = true;

    if (fullName !== "" && !arabicNameRegex.test(fullName)) {
        document.getElementById("nameError").innerText = "الاسم يجب أن يحتوي على أحرف عربية فقط";
        isValid = false;
    }

    if (!nationalIdRegex.test(nationalId)) {
        document.getElementById("idError").innerText = "الرقم الوطني يجب أن يكون 11 رقمًا";
        isValid = false;
    }

    if (birthDate === "") {
    document.getElementById("birthError").innerText = "";
} else if (!birthDateRegex.test(birthDate)) {
    document.getElementById("birthError").innerText =
        "صيغة التاريخ يجب أن تكون dd-mm-yyyy";
    isValid = false;
} else {
    document.getElementById("birthError").innerText = "";
}
    }

    if (mobile !== "" && !mobileRegex.test(mobile)) {
        document.getElementById("mobileError").innerText = "رقم الموبايل غير صحيح";
        isValid = false;
    }

    if (email !== "" && !emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "الإيميل غير صحيح";
        isValid = false;
    }

    if (!isValid) {
        return false;
    }

    let selectedMeals = document.querySelectorAll(".meal-check:checked");
    let resultText = "";
    let total = 0;

    selectedMeals.forEach(function(meal) {
        const mealName = meal.getAttribute("data-name");
        const mealPrice = parseInt(meal.getAttribute("data-price"));

        resultText += "<p>الوجبة: " + mealName + " - السعر: " + mealPrice + " ل.س</p>";
        total += mealPrice;
    });

    let finalTotal = total - (total * 0.05);

    resultText += "<hr>";
    resultText += "<p><strong>المجموع قبل الحسم:</strong> " + total + " ل.س</p>";
    resultText += "<p><strong>المجموع بعد حسم 5%:</strong> " + finalTotal + " ل.س</p>";

    document.getElementById("resultSection").classList.remove("hidden");
    document.getElementById("result").innerHTML = resultText;

    return false;
}
