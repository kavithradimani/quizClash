from rest_framework import serializers
from quizclashBackend.models import User,Quiz,Question
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    profile = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ('id','email','username','first_name','last_name','password','phone','address','is_staff','score','profile')
class UserLoginSerializer(serializers.ModelSerializer):
    profile = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ('id','email','username','first_name','last_name','phone','address','is_staff','score','profile')

class LeaderBoardSerializer(serializers.ModelSerializer):
    profile = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ('id','email','username','score','profile')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs ={
            'password':{'required':True}
        }

    def validate(self,attrs):
        email = attrs.get('email','').strip().lower()
        username = attrs.get('username','')
        if User.objects.filter(email = email).exists():
            raise serializers.ValidationError('User with this email is already exists.')
        elif User.objects.filter(username = username).exists():
            raise serializers.ValidationError('User with this username is already exists.')
        return attrs


    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UpdateUserSerializer(serializers.ModelSerializer):
    profile = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ('email','first_name','last_name','address','phone','password','score','profile')

    def update(self,instance,validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        instance = super().update(instance,validated_data)
       
        return instance 
    
class UpdateScoreSerializer(serializers.Serializer):
    score_value = serializers.IntegerField()
        
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)


    def validate(self,attrs):
        email = attrs.get('email').lower()
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError('pleace give both email and password.')
        
        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email does not exist.')
        
        user = authenticate(request=self.context.get('request'),email=email,password=password)

        if not user:
            raise serializers.ValidationError('Wrong credentials.')

        attrs['user'] = user;
        return attrs

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','score')
        
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
