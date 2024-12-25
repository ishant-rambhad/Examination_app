from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
import json
from .models import StudentDetails

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Check if the user exists and validate the password
            user = StudentDetails.objects.filter(email=email).first()

            if user and check_password(password, user.password):
                return JsonResponse({
                    'status': 'success',
                    'message': 'Login successful',
                    'data': {
                        'email': user.email,
                        'full_name': user.full_name,
                    }
                })
            return JsonResponse({'status': 'error', 'message': 'Invalid email or password'}, status=401)

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth.hashers import make_password
# import json
# from .models import StudentDetails

# @csrf_exempt
# def registration(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             full_name = data.get('full_name')
#             email = data.get('email')
#             password = data.get('password')
#             date_of_birth = data.get('date_of_birth')
#             identity_proof_type = data.get('identity_proof_type')
#             identity_proof_number = data.get('identity_proof_number')
#             course = data.get('course')
#             mobile_number = data.get('mobile_number')

#             # Check if email already exists
#             if StudentDetails.objects.filter(email=email).exists():
#                 return JsonResponse({'status': 'error', 'message': 'Email already registered'}, status=400)

#             # Create and save the student
#             student = StudentDetails(
#                 full_name=full_name,
#                 email=email,
#                 password=make_password(password),  # Hash the password before saving
#                 date_of_birth=date_of_birth,
#                 identity_proof_type=identity_proof_type,
#                 identity_proof_number=identity_proof_number,
#                 course=course,
#                 mobile_number=mobile_number
#             )
#             student.save()

#             return JsonResponse({'status': 'success', 'message': 'Registration successful'})

#         except Exception as e:
#             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

#     return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth.hashers import make_password
# import json
# from .models import StudentDetails

# @csrf_exempt
# def registration(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             student = StudentDetails(
#                 full_name=data.get('fullName'),
#                 email=data.get('email'),
#                 password=make_password(data.get('password')),
#                 date_of_birth=data.get('dateOfBirth'),
#                 identity_proof_type=data.get('identityProofType'),
#                 identity_proof_number=data.get('identityProofNumber'),
#                 course=data.get('course'),
#                 mobile_number=data.get('mobileNumber')
#             )
#             student.save()
#             return JsonResponse({'status': 'success', 'message': 'Registration successful'})
#         except Exception as e:
#             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
#     return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=405)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
import json
from .models import StudentDetails
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@csrf_exempt
def registration(request):
    if request.method == 'POST':
        try:
            # Log the incoming request
            logger.debug("Incoming registration request.")
            
            # Parse the JSON data
            data = json.loads(request.body)
            
            # Log the parsed data
            logger.debug(f"Received data: {data}")

            # Create a new student record
            # student = StudentDetails(
            #     full_name=data.get('fullName'),
            #     email=data.get('email'),
            #     password=make_password(data.get('password')),
            #     date_of_birth=data.get('dateOfBirth'),
            #     identity_proof_type=data.get('identityProofType'),
            #     identity_proof_number=data.get('identityProofNumber'),
            #     course=data.get('course'),
            #     mobile_number=data.get('mobileNumber')
            # )
            student = StudentDetails(
                full_name=data.get('full_name'),
                email=data.get('email'),
                password=make_password(data.get('password')),
                date_of_birth=data.get('date_of_birth'),
                identity_proof_type=data.get('identity_proof_type'),
                identity_proof_number=data.get('identity_proof_number'),
                course=data.get('course'),
                mobile_number=data.get('mobile_number')
            )

            print("Student created:", student)
            student.save()

            # Log success
            logger.debug("Student registered successfully.")

            return JsonResponse({'status': 'success', 'message': 'Registration successful'})
        except Exception as e:
            # Log any errors
            logger.error(f"Error during registration: {e}")
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=405)
